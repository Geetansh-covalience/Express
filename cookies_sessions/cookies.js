import express from "express";
import cookieParser from "cookie-parser";
let app = express();

app.use(cookieParser())



app.get("/",(req,res) => {
  try{
    res.cookie("user","g",{
      httpOnly:false,
      maxAge:60000,
      priority:"high"
    })

    res.cookie("user1","gj",{
      httpOnly:false,
      maxAge:60000,
    })

    res.cookie("user2","j",{
      httpOnly:false,
      maxAge:60000,
      priority:"low"
    })

    res.send("cookies set")
  }

  catch(err){
    res.send("cookies not set")
  }
})

app.get("/profile",(req,res) => {
  req.cookies.user = 'ggggg';

  res.send(req.cookies)

})


app.get("/delete",(req,res) => {
  Object.keys(req.cookies).forEach(cookie => {
      res.clearCookie(cookie)
  });

  res.send("deleted")
})


app.listen(1234)