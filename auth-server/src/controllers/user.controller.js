import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import otpGenerator from "otp-generator"
import nodemailer from "nodemailer"

const registerController = async (req, res) => {
    try {
        const { name, email, password, passwordConfirm, avatar } = req.body
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        401,
                        {},
                        `User with given email already exists`
                    )
                );
        }

        if (avatar === "") {
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        401,
                        {},
                        `Please upload a profile picture to register`
                    )
                );
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        req.body.password = hashPassword;

        req.body.passwordConfirm = await bcrypt.hash(passwordConfirm, salt);

        const otp = otpGenerator.generate(6, {
            digits: true,
            upperCase: false,
            specialChars: false,
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false
        });

        if (req.body.password === req.body.passwordConfirm) {
            const newUser = await User.create({
                name,
                email,
                avatar,
                password: req.body.password,
                passwordConfirm: req.body.passwordConfirm,
                // isVerified: false,
                otp
            });

            console.log(newUser);

            if (!newUser) {
                console.log(`Something went wrong while registering the user: ${error.message}`);
                return res
                    .status(200)
                    .json(
                        new ApiResponse(
                            500,
                            {},
                            `Something went wrong while registering the user`
                        )
                    );
            }

            const token = jwt.sign(
                { id: newUser._id },
                process.env.JWT_TOKEN_SECRET,
                { expiresIn: process.env.JWT_TOKEN_EXPIRY }
            );

            // sending email for otp verification
            const transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: process.env.TRANSPORTER_EMAIL,
                    pass: process.env.TRANSPORTER_PASSWORD
                }
            });

            const mailOptions = {
                from: "FoodHut client webdev warriors",
                to: email,
                subject: "OTP for Email Verification",
                text: `Hello, \n\nThank you for registering with Food Hunt. To complete your email verification, please use the following One-Time Password (OTP):\n ${otp} \n\nThis OTP is valid for the next 15 minutes. If you didn't request this verification,please ignore this email. \nBest regards, \nThe FootHut Team`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(`Error while sending email for OTP verification: ${error.message}`);
                    return res
                        .status(200)
                        .json(
                            new ApiResponse(
                                502,
                                {},
                                "Error while sending email for OTP verification"
                            )
                        );
                }

                res.json(
                    new ApiResponse(200, {}, "OTP sent to email successfully")
                )
            });

            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        {
                            user: newUser,
                            token,
                        },
                        `User with name ${name} registered successfully`
                    )
                );
            // return res.status(201)
            //     .send({
            //         message: `User with name ${name} registered successfully`,
            //         data: {
            //             user: newUser,
            //             token,
            //         },
            //         success: true
            //     })

        }
        else {
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        401,
                        {},
                        "Passwords don't match"
                    )
                );
        }
    } catch (error) {
        throw new ApiError(400, `Some error occured while registering user: ${error.message}`);
    }
}

const authController = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body?.userId }).select("+isVerified");
        if (!user) {
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        401,
                        {},
                        "User not found!"
                    )
                );
        }
        else {
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        {
                            user: user,
                        },
                        "User Found successfully"
                    )
                );
        }
    } catch (error) {
        console.log(error);
        throw new ApiError(400, `Auth error: ${error.message}`);
    }
}

const loginController = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }).select("+password");

        if (!user) {
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        401,
                        {},
                        "User not found!"
                    )
                );
        }

        const isPasswordMatched = await bcrypt.compare(req.body?.password, user.password);
        const signedUser = await User.findOne({ email: req.body.email })
        // console.log(signedUser)
        if (!isPasswordMatched) {
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        401,
                        {},
                        "Invalid password or email"
                    )
                );
        }

        const token = jwt.sign(
            { id: signedUser._id },
            process.env.JWT_TOKEN_SECRET,
            { expiresIn: process.env.JWT_TOKEN_EXPIRY }
        );
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {
                        user: signedUser,
                        token,
                    },
                    "User logged in successfully"
                )
            );

    } catch (error) {
        console.log(error);
        throw new ApiError(400, `Error in login controller: ${error.message}`);
    }
}

export { registerController, authController, loginController }