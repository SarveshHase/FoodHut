import express, { Router } from "express"
import ExpressFormidable from "express-formidable"
import multer from "multer";
import { imageUploadController } from "../controllers/imageUpload.controller.js";

const router = Router();

router.route('/upload-image').post(
    ExpressFormidable({ maxFieldsSize: 5 * 2024 * 2024 }),
    imageUploadController
);

export default router
