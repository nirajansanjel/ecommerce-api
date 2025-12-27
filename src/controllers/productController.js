import productServices from "../services/productServices.js";

const filteredProducts = async (req, res) => {
  try {
    const products = await productServices.filteredProducts(req.query);

    res.status(200).send(products);
  } catch (error) {
    res.send(error.message);
  }
};
const ratedProduct = (req, res) => {
  try {
    const finalRatedProduct = productServices.isRatedProduct();
    res.status(200).send(finalRatedProduct);
  } catch (error) {
    res.send(error.message);
  }
};
const productById = async (req, res) => {
  try {
    const productData = req.params.id;
    const getProductById = await productServices.getProductById(productData);

    res.status(200).json(getProductById);
  } catch (error) {
    res.status(error.statusCode).send(error.message);
  }
};
const getProducts = async (req, res) => {
  const response = await productServices.getProducts();
  res.status(201).json(response);
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productServices.updateProduct(
      req.params.id,
      req.body,
      req.files,
      req.user._id
    );
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(error.statusCode).send(error.message);
  }
};
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await productServices.deleteProduct(productId);
    res.status(200).send(`Product deleted with id ${productId}`);
  } catch (error) {
    res.send(error.message);
  }
};

const newProduct = async (req, res) => {
  try {
    const createdProduct = await productServices.addedProduct(
      req.body,
      req.files,
      req.user._id
    );

    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};
export default {
  filteredProducts,
  ratedProduct,

  updateProduct,
  deleteProduct,
  productById,
  newProduct,
  getProducts,
};
