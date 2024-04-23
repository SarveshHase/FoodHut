import express, { Router } from "express"
import {
    createFoodController,
    getAllFoodsController,
    getFoodByIdController,
    getNewFoodsController,
    getFoodsFromDistinctCategoriesController,
    getTopRatedFoodsController
} from "../controllers/food.controller.js";


const router = Router();

router.route("/addFood").post(createFoodController);
router.route("/getAllFoods").get(getAllFoodsController);
router.route("/getNewFoods").get(getNewFoodsController);
router.route("/specialFoods").get(getFoodsFromDistinctCategoriesController);
router.route("/getTopRated").get(getTopRatedFoodsController);
router.route("/getFoodDetails/:id").get(getFoodByIdController);

export default router
