import { Food } from "../models/food.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createFoodController = async (req, res) => {
    try {
        const { name, price, description, category, weight, foodImage } = req.body.foodData;
        // console.log(req.body);
        const newFood = await Food.create({
            name,
            price,
            description,
            category,
            weight,
            foodImage
        });

        if (!newFood) {
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        500,
                        {},
                        "Error while adding Food item"
                    )
                )
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {
                        food: newFood
                    },
                    "Food added successfully"
                )
            )
    } catch (error) {
        console.log("Error in createFoodController: ", error);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    500,
                    {},
                    "Internal server error while adding food item"
                )
            )
    }
};


const getAllFoodsController = async (req, res) => {
    try {
        const { category } = req.query
        // console.log(category);
        let foodItems = null

        if (category === "all") {
            foodItems = await Food.find();
        } else {
            foodItems = await Food.find({ category: category });
        }



        if (!foodItems) {
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        500,
                        {},
                        "Error while getting Food items"
                    )
                )
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {
                        foodItems
                    },
                    "Food fetched successfully"
                )
            )
    } catch (error) {
        console.log("Error in createFoodController: ", error.message);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    500,
                    {},
                    "Internal server error while getting food items"
                )
            )
    }
}

const getFoodByIdController = async (req, res) => {
    try {
        const { id } = req.params
        // console.log(category);
        const foodItems = await Food.findById(id);

        if (!foodItems) {
            console.log("Error while getting food item by ID: ", error.message);
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        500,
                        {},
                        "Error while getting Food item"
                    )
                )
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {
                        foodItems
                    },
                    "Food details fetched successfully"
                )
            )
    } catch (error) {
        console.log("Error in getFoodByIdController: ", error.message);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    500,
                    {},
                    "Internal server error while getting food item by ID"
                )
            )
    }
}

export { createFoodController, getAllFoodsController, getFoodByIdController }