import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from './app.js'

dotenv.config({
    path: './.env'
})

const port = process.env.PORT || 8000

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`App is running on port ${process.env.PORT}`);
        })
    })
    .catch(err => {
        console.log(`MongoDB connection error: ${err}`);
    })