import express from "express";
import { isLoggedIn } from "./middlewares/session.js";
import {login_logoutRouter} from "./auth/login_logout.js";
import { homeRouter } from "./home/home.js";
import { adminRouter } from "./users/admin.js";

let router = express.Router();

router.use("/",adminRouter);
router.use("/",login_logoutRouter);
router.use("/",homeRouter);

export default router;
