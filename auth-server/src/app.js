import express from "express";
import cors from "cors"

const app = express()

app.use(cors());
app.use(express.json({ limit: "3mb" }));

app.get('/', (req, res) => {
    res.send("Hello World")
});



import imageRoute from "./routes/image.route.js"
import userRoute from "./routes/user.route.js"
app.use('/api/v1/all', imageRoute)
app.use('/api/v1/user', userRoute)


export { app }