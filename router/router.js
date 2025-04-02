import express from "express";

let router = express.Router();

router.get("/name",(req,res) => {
    res.status(200).send("I am Geetansh")
})

router.get("/age",(req,res) => {
    res.status(200).send("I am 22 yrs old")
})

export default router;