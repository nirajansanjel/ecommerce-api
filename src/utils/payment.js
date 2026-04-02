import Stripe from "stripe";
import config from "../config/config.js";
import axios from "axios";

const payViaKhalti = async (data) => {
  if (!data) throw { message: "Payment Data is required." };

  if (!data.amount) throw { message: "Payment Amount is required." };

  if (!data.purchaseOrderId)
    throw {
      message: " Purchase order id  is required.",
    };
  if (!data.purchaseOrderName)
    throw {
      message: " Purchase order name  is required.",
    };
  const body = {
    return_url: `${config.appUrl}/orders/${data.purchaseOrderId}/payment/khalti`,
    website_url: `${config.appUrl}`,
    amount: data.amount,
    purchase_order_id: data.purchaseOrderId,
    purchase_order_name: data.purchaseOrderName,
    customer_info: {
      name: data.customer.name,
      email: data.customer.email,
      phone: data.customer.phone,
    },
  };

  const result = await axios.post(
    `${config.khaltiPayment.khaltiApiURL}/epayment/initiate/`,
    body,
    {
      headers: {
        Authorization: `Key ${config.khaltiPayment.khaltiApiKey}`,
      },
    },
  );

  return result.data;
};
const payViaStripe = async (data) => {
  const stripe = new Stripe(config.stripe.secretKey);
  if (!data) throw { message: "Payment Data is required." };

  if (!data.amount) throw { message: "Payment Amount is required." };

  if (!data.orderId)
    throw {
      message: " Purchase order id  is required.",
    };
  if (!data.orderName)
    throw {
      message: " Purchase order name  is required.",
    };
  return await stripe.paymentIntents.create({
    amount: data.amount,
    currency: data.currency || "npr",
    metadata: {
      customer_email: data.customer.email,
      customer_name: data.customer.name,
      customer_phone: data.customer.phone,
      order_id: data.orderId,
      order_name: data.orderName,
    },
  });
};
export default { payViaKhalti, payViaStripe };
