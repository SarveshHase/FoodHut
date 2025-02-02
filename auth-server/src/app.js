import express from "express";
import cors from "cors"
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import xss from 'xss';

const app = express()

// XSS Protection Middleware
const xssProtection = (req, res, next) => {
    if (req.body) {
        for (let key in req.body) {
            if (typeof req.body[key] === 'string') {
                req.body[key] = xss(req.body[key]);
            }
        }
    }
    next();
};

app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(helmet()); // Adds various HTTP headers
app.use(xssProtection); // Custom XSS protection
app.use(mongoSanitize()); // Prevent NoSQL injections
app.use(cookieParser()); // Parse cookies

// For redirects
app.use((req, res, next) => {
    const oldRedirect = res.redirect;
    res.redirect = function (url) {
        const sanitizedUrl = encodeURI(url);
        return oldRedirect.call(this, sanitizedUrl);
    };
    next();
});

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

import imageRoute from "./routes/image.route.js"
import userRoute from "./routes/user.route.js"
import foodRoute from "./routes/food.route.js"
import orderRoute from "./routes/order.route.js"
app.use('/api/v1/all', imageRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/food', foodRoute)
app.use('/api/v1/order', orderRoute)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? err.message : null
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

export { app }