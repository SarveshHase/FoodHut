import express, { Router } from "express"
import {
    createOrderController,
    getAllOrdersController,
    getSingleOrderController,
    markOrderAsDeliveredController
} from "../controllers/order.controller.js";
import { protect } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/order").post(createOrderController);
router.route("/getorders").post(protect, getAllOrdersController);
router.route("/getorder").post(protect, getSingleOrderController);
router.route("/delivered").post(protect, markOrderAsDeliveredController);

export default router
