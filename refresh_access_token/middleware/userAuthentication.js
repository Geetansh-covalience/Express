import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Token from "../models/token.js";

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
    if (err) return res.redirect("/login");
  });
  next();
};

const checkLoginStatus = (req, res, next) => {
  if(req.cookies.token){
    const token = req.cookies.token;
    const tokenEndingTime = jwt.decode(token).exp;
    const currTime = Math.floor(Date.now() / 1000);
    let tokenTimeLeft = Math.floor((tokenEndingTime - currTime) / 60);
    
    tokenTimeLeft < 2 ? res.redirect("/login") : next()

  }

};

export { authenticateToken, checkLoginStatus };
