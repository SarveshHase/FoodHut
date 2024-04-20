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
                throw new ApiError(401, `Authentication failed: ${err.message}`);
            } else {
                req.body.userId = decode.id;
                next();
            }
        });
    } catch (error) {
        console.log(error);
        if (error instanceof ApiError) {
            res.status(error.statusCode).json(new ApiResponse(error.statusCode, null, error.message));
        } else {
            res.status(500).json(new ApiResponse(500, null, `Internal Server Error: ${error.message}`));
        }
    }
};

export { protect };
