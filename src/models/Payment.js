import mongoose from "mongoose";
const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, "Amount is required."],
  },
  method: {
    type: String,
    enum: ["cash", "card", "online"],
    required: [true, "Payment Method is required."],
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "completed", "failed"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  transactionId: {
    type: String,
  },
});
const model = mongoose.model("Payment", paymentSchema);
export default model;
