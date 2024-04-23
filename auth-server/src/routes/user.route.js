import express, { Router } from "express"
import { authController, loginController, registerController, updateUserProfileController, verifyOtpController } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerController);
router.route("/get-user").post(protect, authController);
router.route("/login").post(loginController);
router.route("/verifyotp").post(verifyOtpController);
router.route("/update-profile").put(protect, updateUserProfileController);

export default router
