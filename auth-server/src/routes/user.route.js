import express, { Router } from "express"
import { authController, loginController, registerController } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerController);
router.route("/get-user").post(protect, authController);
router.route("/login").post(loginController);

export default router
