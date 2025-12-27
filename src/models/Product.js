import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  brand: String,
  category: String,
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  stock: {
    type: Number,
    default: 10,
    max: [500, "Maximum stock should not cross 500"],
  },
  imageUrls: {
    type: [String],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Creator is required!"],
  },
  description: String,
});
const model = mongoose.model("Product", productSchema);
export default model;
