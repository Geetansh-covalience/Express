import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import sql from "./config/db.js";
import Token from "./models/token.js";
import User from "./models/user.js";
import userRoutes from "./routes/userRoutes.js";

User.hasOne(Token, { foreignKey: "uid" });
Token.belongsTo(User, { foreignKey: "uid" });
sql.sync()
  .then(() => console.log("Tables synced"))
  .catch((err) => console.error("Sync error:", err));

let app = express();
app.use(cookieParser());
app.use(express.json());
dotenv.config({path:"config/.env"})
app.use(express.urlencoded({ extended: true }));
app.use("/",userRoutes)


app.listen(process.env.PORT);