import user from "../controllers/userController.js";
import express from "express";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", user.createUser);
router.get("/users", user.getUsers);
router.get("/user/:id", user.getUserById);
router.put("/user/:id",auth, user.updateUser);
router.delete("/user/:id",user.userDelete);
router.patch("/user/:id/profile-image",user.UpdateProfileImage);
router.post("/merchant", user.createMerchant);
export default router;
