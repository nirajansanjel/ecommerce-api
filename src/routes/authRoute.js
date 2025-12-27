import express from "express";
import userAuth from "../controllers/authController.js";
const router = express.Router();
// http://localhost:5000/api/auth
router.post("/register", userAuth.userRegister);
router.post("/login", userAuth.userLogin);
router.post("/forgot-password", userAuth.forgotPassword);
router.post("/reset-password", userAuth.resetPassword);



export default router;
