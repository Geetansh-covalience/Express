import express from "express";


const app = express();

app.get("/",(req,res) => {
    res.send("Hello")
})

app.get("/user/:name",(req,res) => {
    res.send(`Hello Mr. ${req.params.name}`)
})

app.listen(3000,() => {
    console.log("running");
    
})