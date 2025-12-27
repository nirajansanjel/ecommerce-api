import mongoose from "mongoose";
import { USER, MERCHANT, ADMIN } from "../constants/roles.js";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
        return emailRegex.test(value);
      },
      message: "Invalid Email",
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  role: {
    type: [String],
    default: [USER],
    enum: [USER, ADMIN, MERCHANT],
  },
  phone: {
    type: Number,
    required: true,
    unique: [true, "Phone Number should be unique!"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  address: {
    type: String,
  },
  profileImage: {
    type: String,
  },
});
const userModel = mongoose.model("User", userSchema);
export default userModel;
