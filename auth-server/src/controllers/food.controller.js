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

const getNewFoodsController = async (req, res) => {
    try {
        const foodItems = await Food.find().sort({ createdAt: -1 }).limit(12);

        if (!foodItems) {
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        500,
                        {},
                        "Error while getting new Food items"
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
                    "New food items fetched successfully"
                )
            )
    } catch (error) {
        console.log("Error in getNewFoodsController: ", error.message);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    500,
                    {},
                    "Internal server error while getting new food items"
                )
            )
    }
}

const getFoodsFromDistinctCategoriesController = async (req, res) => {
    try {
        const distinctCategory = await Food.distinct("category");
        if (!distinctCategory.length) {
            return res.status(404).json(new ApiResponse(404, {}, "No categories found"));
        }

        const distinctFood = await Promise.all(
            distinctCategory.slice(0, 4).map(async (category) => {
                const food = await Food.findOne({ category });
                return food;
            })
        );

        if (distinctFood.some(item => item === null)) {
            return res.status(404).json(new ApiResponse(404, {}, "Some categories did not have food items"));
        }

        return res
            .status(200)
            .json(new ApiResponse(
                200,
                { foodItems: distinctFood },
                "Distinct food items fetched successfully")
            );
    } catch (error) {
        console.log("Error in getFoodsFromDistinctCategoriesController: ", error.message);
        return res.status(500).json(new ApiResponse(500, {}, "Internal server error while getting distinct food items"));
    }
};

const getTopRatedFoodsController = async (req, res) => {
    try {
        const topRatedFoods = await Food.find().sort({ "reviews.rating": -1 });
        if (!topRatedFoods) {
            return res.status(404).json(new ApiResponse(404, {}, "Error while getting top rated foods"));
        }

        return res
            .status(200)
            .json(new ApiResponse(
                200,
                {
                    foodItems: topRatedFoods
                },
                "Top rated food items fetched successfully")
            );
    } catch (error) {
        console.log("Error in getTopRatedFoods: ", error.message);
        return res.status(500).json(new ApiResponse(500, {}, "Internal server error while getting top rated food items"));
    }
};


export {
    createFoodController,
    getAllFoodsController,
    getFoodByIdController,
    getNewFoodsController,
    getFoodsFromDistinctCategoriesController,
    getTopRatedFoodsController
}