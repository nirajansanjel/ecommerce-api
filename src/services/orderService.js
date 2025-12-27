import model from "../models/Order.js";
import Payment from "../models/Payment.js";
import payment from "../utils/payment.js";
import { ORDER_STATUS_CONFIRMED } from "../constants/orderStatus.js";
const getOrders = async () => {
  return await model
    .find()
    .populate("orderItems.product")
    .populate("userId", ["name", "email", "phone", "address"])
    .populate("payment");
};

const getOrdersByUser = async (user) => {
  return await model
    .find({ userId: user })
    .populate("orderItems.product")
    .populate("userId", ["name", "email", "phone", "address"])
    .populate("payment");
};
const getOrderById = async (id) => {
  return await model
    .findById(id)
    .populate("orderItems.product")
    .populate("userId", ["name", "email", "phone", "address"])
    .populate("payment");
};

const createOrder = async (data, userId) => {
  const orderNumber = crypto.randomUUID();
  return (await model.create({ ...data, userId, orderNumber })).populate(
    "orderItems.product"
  );
};

const updateOrder = async (id, data) => {
  const result = await model.findByIdAndUpdate(
    id,
    {
      status: data.status,
    },
    { new: true }
  );

  if (!result) throw { message: "Update unsuccessful!" };
  return result;
};
const paymentViaKhalti = async (id) => {
  const order = await getOrderById(id);
  const transactionId = crypto.randomUUID();
  const paymentCreate = await Payment.create({
    amount: order.totalPrice,
    method: "online",
    transactionId,
  });
  await model.findByIdAndUpdate(id, { payment: paymentCreate._id });

  const paymentData = await payment.payViaKhalti({
    amount: order.totalPrice * 100,
    purchaseOrderId: order.id,
    purchaseOrderName: order.orderNumber,
    customer: order.userId,
  });
  return paymentData;
};

const confirmOrderPayment = async (id, status) => {
  const order = await getOrderById(id);
  if (status.toLowerCase() != "completed") {
    await Payment.findByIdAndUpdate(order.payment._id, { status: "failed" });
    throw {
      statusCode: 400,
      message: "Payment failed.",
    };
  }
  await Payment.findByIdAndUpdate(order.payment._id, { status: "completed" });
  return await model.findByIdAndUpdate(
    id,
    {
      status: ORDER_STATUS_CONFIRMED,
    },
    { new: true }
  );
};
const getOrdersOfMerchant = async (merchantId) => {
  // const orders = await model
  //   .find()
  //   .populate("userId", ["name", "email", "phone", "address"])
  //   .populate("payment");
  // return orders;
  const orders = await model.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "orderItems.product",
        foreignField: "_id",
        as: "orderItems",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userId",
      },
    },
    {
      $unwind: "$userId",
    },
    {
      $project: {
        "userId.name": 1,
        "userId.email": 1,
        "userId.phone": 1,
        orderNumber: 1,
        orderItems: 1,
        status: 1,
        totalPrice: 1,
        shippingAddress: 1,
        createdAt: 1,
      },
    },
  ]);

  return orders.map((order) => {
    const filteredOrders = order.orderItems.filter(
      (item) => item.createdBy == merchantId
    );
    return {
      ...order,
      orderItems: filteredOrders,
    };
  }).filter((order) => order.orderItems.length > 0);;
};

export default {
  getOrders,
  createOrder,
  getOrdersByUser,
  updateOrder,
  paymentViaKhalti,
  getOrderById,
  confirmOrderPayment,
  getOrdersOfMerchant,
};
