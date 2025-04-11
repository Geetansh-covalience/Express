import express from "express";
import cookieParser from "cookie-parser";
import user from "./models/schema.js";
import dotenv from "dotenv"

dotenv.config({path:"config/.env"})
let app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/",userRoutes)

app.get("/",(req,res) => {
    res.send("Hi")
})
app.listen(process.env.PORT);