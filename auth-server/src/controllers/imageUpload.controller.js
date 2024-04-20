import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const imageUploadController = async (req, res) => {
    try {
        const file = req.files?.image.path;
        if (!file) {
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        401,
                        {},
                        `Please upload image before registering`
                    )
                );
        }

        const result = await cloudinary.uploader.upload(file)
        res.json({
            url: result.secure_url,
            public_id: result.public_id
        })
    } catch (error) {
        throw new ApiError(500, `Error while uploading the file on cloudinary: ${error.message}`)
    }
};

export { imageUploadController }