import fs from "fs";
import productModel from "../models/Product.js";
import uploadFile from "../utils/file.js";
import promptGemini from "../utils/gemini.js";
import { PRODUCT_DESCRIPTION_PROMPT } from "../constants/prompt.js";

const filteredProducts = async (query) => {
  const { limit, offset, brands, category, min, max, name, createdBy } = query;
  const sort = JSON.parse(query.sort || "{}");
  const filters = {};

  if (brands) {
    const brandItems = brands.split(",");
    filters.brand = { $in: brandItems };
  }
  if (category) filters.category = category;
  if (min) {
    filters.price = { $gte: min };
  }
  if (max) {
    filters.price = { ...filters.price, $lte: max };
  }
  if (name) filters.name = { $regex: name, $options: "i" };

  if (createdBy) filters.createdBy = createdBy;

  const filteredProducts = await productModel
    .find(filters)
    .sort(sort)
    .limit(limit)
    .skip(offset);
  return filteredProducts;
};
const isRatedProduct = () => {
  const rawData = fs.readFileSync("./src/data/products.json", "utf8");
  const ratedProduct = JSON.parse(rawData);
  const isRatedProduct = ratedProduct.filter((item) => item.rating === 5);
  return isRatedProduct;
};
const getProductById = async (productId) => {
  const productById = await productModel.findById(productId);
  if (!productById)
    throw {
      statusCode: 404,
      message: "Product Not Found",
    };
  return productById;
};
const getProducts = async () => {
  const result = await productModel.find();
  return result;
};
const updateProduct = async (id, data, files, userId) => {
  const product = await getProductById(id);

  if (product.createdBy != userId)
    throw {
      statusCode: 404,
      message: " Access Denied!",
    };
  const updateData = data;
  if (files.length > 0) {
    const uploadedFiles = await uploadFile(files);
    updateData.imageUrls = uploadedFiles.map((item) => item?.url);
  }
  const updateProductId = await productModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return updateProductId;
};
const deleteProduct = async (productId) => {
  await productModel.findByIdAndDelete(productId);
};

const createProduct = async (data, files, createdBy) => {
  const uploadedFiles = await uploadFile(files);

  const promptMessage = PRODUCT_DESCRIPTION_PROMPT.replace("%s", data.name)
    .replace("%s", data.brand)
    .replace("%s", data.category);

  const description = data.description ?? (await promptGemini(promptMessage));

  const createdProduct = await productModel.create({
    ...data,
    createdBy,
    imageUrls: uploadedFiles.map((item) => item?.url),
    description,
  });

  return createdProduct;
};
export default {
  filteredProducts,
  isRatedProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  createProduct,
  getProducts,
};
