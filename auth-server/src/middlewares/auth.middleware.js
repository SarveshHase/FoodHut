import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const protect = async (req, res, next) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            throw new ApiError(401, `Token not found in the header`);
        }

        jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decode) => {
            if (err) {
                return res
                    .status(200)
                    .json(
                        new ApiResponse(
                            401,
                            {
                                message: "Auth Error"
                            },
                            `Error in auth.middleware verify function: ${error.message}`
                        )
                    );
            } else {
                req.body.userId = decode.id;
                next();
            }
        });
    } catch (error) {
        console.log(error);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    401,
                    {
                        message: "Auth Error"
                    },
                    `Error in auth.middleware: ${error.message}`
                )
            );
    }
};

export { protect };
