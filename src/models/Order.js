import mongoose from "mongoose";
import {
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_PENDING,
  ORDER_STATUS_SHIPPED,
  ORDER_STATUS_DELIVERED,
} from "../constants/orderStatus.js";

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: [true, "Order Number is required."],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Order Creator is required."],
  },
  orderItems: [
    {
      product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: [true, "Order Item is required."],                              
      },
    
     quantity: {
    type: Number,
    default: 1,
  },
},
  ],
 
  totalPrice: {
    type: Number,
    required: [true, "Total Price is required."],
  },
  shippingAddress: {
    country: {
      type: String,
      default: "Nepal",
    },
    province: {
      type: String,
      required: [true, "Shipping City is required."],
    },
    street: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  status: {
    type: String,
    default: ORDER_STATUS_PENDING,
    enum: [
      ORDER_STATUS_CONFIRMED,
      ORDER_STATUS_SHIPPED,
      ORDER_STATUS_DELIVERED,
      ORDER_STATUS_PENDING,
    ],
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Payment"
  },
});
const model = mongoose.model("Order", orderSchema);
export default model;
