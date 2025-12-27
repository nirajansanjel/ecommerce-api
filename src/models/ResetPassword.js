import mongoose from "mongoose";
const resetPassword = new mongoose.Schema({
  token: {
    type: String,
    required: [true, "Forgot Password Token is required!"],
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 3600000),
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "User Id is required!"],
  },
});

const model = mongoose.model("ResetPassword", resetPassword);
export default model;
