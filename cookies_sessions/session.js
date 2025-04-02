import session from "express-session";
import express from "express";

let app = express();
app.use(session({
  saveUninitialized:false,
  secret:"L9#@4frq1FSAV%TY^&",
  cookie:("user4","gj329",{
    httpOnly:false,
    maxAge:60000,
    priority:"high"
  })
}))

app.get("/", (req, res) => {
  res.send("Hello from session");
});

app.get("/set",(req,res) => {
  req.session.user = {username:"geetansh",pass:"hell"}
  res.send("set")
})

app.get("/get",(req,res) => {
  if(req.session.user){
    res.send(`welcome ${req.session.user.username} and ${req.sessionID}`)
  }

  else{
    res.send("no user found")
  }
})

app.get("/del",(req,res) => {
  req.session.destroy((err) => {
    if(err){
      res.send(err )
    }

    else{
      res.send("deleted")
    }
  })
})


app.listen(1233);
