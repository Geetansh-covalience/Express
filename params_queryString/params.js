import express from "express";

let app = express();

app.get("/",(req,res) => {
    res.send("<h1>Hello Bhai!!!!</h1>")
})
app.get("/user/:userID?/post/:postID?",(req,res) => {
    const {userID,postID} = req.params
    res.send(`<h1> User Name: ${userID}  Post Number: ${postID || "not present"} </h1> `)
})

app.listen(3002)