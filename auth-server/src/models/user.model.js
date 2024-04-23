import mongoose from "mongoose"
import bcrypt from "bcrypt"
import validator from "validator"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please provide email"]
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false //indicates that 'password' field should not be included during database query
    },
    passwordConfirm: {
        type: String,
        required: true,
        minlength: 8,
        select: false, //indicates that this field should not be included during database query
        validate: {
            validator: function (pass) {
                return pass === this.password
            },
            message: "Passwords don't match"
        }
    },
    isVerified: {
        type: Boolean,
        default: false,
        select: false
    },
    otp: {
        type: Number,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    avatar: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: false
    },
    district: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    zipcode: {
        type: String,
        required: false
    },
}, { timestamps: true })

export const User = mongoose.model("User", userSchema)