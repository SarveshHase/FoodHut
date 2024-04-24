import { ApiResponse } from "../utils/ApiResponse.js";
import { Order } from "../models/order.model.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const createOrderController = async (req, res) => {
    try {
        const { user, items, totalAmount } = req.body;
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: "paid for food",
                        },
                        unit_amount: totalAmount * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.LOCALHOST_URL}/success`,
            cancel_url: `${process.env.LOCALHOST_URL}/cancel`
        });

        if (session.id) {
            const newOrder = await Order.create({
                user,
                items,
                totalAmount
            });

            if (!newOrder) {
                return res
                    .status(200)
                    .json(
                        new ApiResponse(
                            500,
                            {},
                            `Some error while creating new order`
                        )
                    );
            }

            const saveOrder = await Order.findByIdAndUpdate(newOrder._id, {
                payment: true
            })

            if (!newOrder) {
                return res
                    .status(200)
                    .json(
                        new ApiResponse(
                            500,
                            {},
                            `Some error while updating payment status of the order`
                        )
                    );
            }

            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        {
                            order: saveOrder,
                            sessionId: session.id,
                        },
                        `Order placed successfully`
                    )
                );
        } else {
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        500,
                        {},
                        `Some error while creating stripe session`
                    )
                );
        }
    } catch (error) {
        console.log("Error in createOrderController: ", error.message);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    500,
                    {},
                    `Internal server error while creation of order`
                )
            );
    }
}

const markOrderAsDeliveredController = async (req, res) => {
    try {
        const { orderId } = req.body;

        const order = await Order.findById(orderId);

        if (!order) {
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        500,
                        {},
                        `Some error while marking order as delivered`
                    )
                );
        }

        order.status = "Delivered"
        await order.save()

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {
                        order
                    },
                    `Order delivered`
                )
            );
    } catch (error) {
        console.log("Error in markOrderAsDeliveredController: ", error.message);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    500,
                    {},
                    `Internal server error while marking order as delivered`
                )
            );
    }
}

const getAllOrdersController = async (req, res) => {
    try {
        const orders = await Order.find().populate("items.food").populate("user");

        if (!orders) {
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        500,
                        {},
                        `Some error while getting all the orders`
                    )
                );
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {
                        orders
                    },
                    `Orders fetched successfully`
                )
            );
    } catch (error) {
        console.log("Error in getAllOrdersController: ", error.message);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    500,
                    {},
                    `Internal server error while getting all the orders`
                )
            );
    }
}

const getSingleOrderController = async (req, res) => {
    try {
        const { userId } = req.body;
        const userOrders = await Order.find({ user: userId }).populate("items.food").populate("user");


        if (!userOrders) {
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        500,
                        {},
                        `Some error while fetching order for the given user`
                    )
                );
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {
                        orders: userOrders
                    },
                    `Order for the given user fetched successfully`
                )
            );
    } catch (error) {
        console.log("Error in getSingleOrderController: ", error.message);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    500,
                    {},
                    `Internal server error while getting order for the given user`
                )
            );
    }
}

export {
    createOrderController,
    getAllOrdersController,
    getSingleOrderController,
    markOrderAsDeliveredController
}