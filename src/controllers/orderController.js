import orderService from "../services/orderService.js";
const Orders = async (req, res) => {
  try {
    const data = await orderService.getOrders();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const ordersByUser = async (req, res) => {
  try {
    const data = await orderService.getOrdersByUser(req.user._id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getOrderById = async (req, res) => {
  try {
    const data = await orderService.getOrderById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.send(error.message);
  }
};
const createdOrder = async (req, res) => {
  try {
    const input = req.body;
    if (!input.orderItems || !input.orderItems.length)
      res.status(400).send("Order Items is needed.");
    const data = await orderService.createOrder(req.body, req.user);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const updateOrderStatus = async (req, res) => {
  try {
    const data = await orderService.updateOrder(req.params.id, req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const payViaKhalti = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await orderService.paymentViaKhalti(id);

    res.json(result);
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
};
const confirmOrderPayment = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await orderService.confirmOrderPayment(id, req.body.status);

    res.json(result);
  } catch (error) {
    res.send(error.message);
  }
};
const getOrdersOfMerchant = async (req, res) => {
  try {
    const data = await orderService.getOrdersOfMerchant(req.user._id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
export default {
  Orders,
  createdOrder,
  ordersByUser,
  updateOrderStatus,
  payViaKhalti,
  getOrderById,
  confirmOrderPayment,
  getOrdersOfMerchant
};
