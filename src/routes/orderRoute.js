import express from "express";
import auth from "../middlewares/auth.js";
import orderController from "../controllers/orderController.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ADMIN } from "../constants/roles.js";
// route: /api/orders/
const router = express.Router();
router.get("/", auth, roleBasedAuth(ADMIN), orderController.Orders);
router.get("/user", auth, orderController.ordersByUser);
router.get("/merchant", auth, orderController.getOrdersOfMerchant);
router.get("/user/:id",auth, roleBasedAuth(ADMIN), orderController.getOrderById);

router.post("/create", auth, orderController.createdOrder);
router.put(
  "/:id",
  auth,
  roleBasedAuth(ADMIN),
  orderController.updateOrderStatus
);
router.post("/:id/payment/khalti",auth, orderController.payViaKhalti);
router.post("/:id/payment/stripe",auth, orderController.payViaStripe);
router.put("/:id/confirm-payment", orderController.confirmOrderPayment);
router.delete("/:id",auth, orderController.deleteOrder);


export default router;
