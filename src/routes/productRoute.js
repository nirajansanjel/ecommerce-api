import express from "express";
import products from "../controllers/productController.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { MERCHANT } from "../constants/roles.js";
// route: api/products/
const router = express.Router();
router.get("/", products.filteredProducts);
router.get("/rating", products.ratedProduct);
router.get("/all", products.getProducts);
router.get("/:id", products.productById);
router.post("/create", auth, roleBasedAuth(MERCHANT), products.newProduct);
router.put("/update/:id",auth, roleBasedAuth(MERCHANT), products.updateProduct);
router.delete("/:id",auth, roleBasedAuth(MERCHANT), products.deleteProduct);
export default router;
