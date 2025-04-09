import express from "express";
import { isLoggedIn } from "../middlewares/session.js";
import axios from "axios";

let adminRouter = express.Router();

adminRouter.get("/listFood", isLoggedIn, async (req, res) => {
  try {
    let resposne = await axios.get(
      "https://zwigato-server-m6w6.onrender.com/api/food/list"
    );
    res.json((await resposne).data.data);
  } catch (err) {
    console.log(err);
  }
});

adminRouter.get("/addFood", isLoggedIn, async (req, res) => {
  res.send("Feature not aval");
});

export { adminRouter };
