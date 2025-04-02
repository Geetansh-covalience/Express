import express from "express";

let router = express.Router();

router.use("/img",express.static('public/img'))

export default router;