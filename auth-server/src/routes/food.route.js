import express, { Router } from "express"
import { createFoodController, getAllFoodsController, getFoodByIdController } from "../controllers/food.controller.js";


const router = Router();

router.route("/addFood").post(createFoodController);
router.route("/getAllFoods").get(getAllFoodsController);
router.route("/getFoodDetails/:id").get(getFoodByIdController);

export default router
