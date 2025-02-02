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
router.get('/food/:id([0-9a-fA-F]{24})', getFoodByIdController);

export default router
