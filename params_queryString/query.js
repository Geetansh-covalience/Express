import express from "express";

let app = express();

app.get("/",(req,res) => {
    res.send("<h1>Hello Bhai!!!!</h1>")
})
app.get("/user",(req,res) => {
    const filter = req.query.filter
    res.send(`<h1>${filter} </h1> `)
})

app.listen(3001)