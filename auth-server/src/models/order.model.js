import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            food: {
                type: mongoose.Schema.ObjectId,
                ref: "Food",
                required: true,
            },
            qty: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    payment: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ["Pending", "Delivered"],
        default: "Pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema)