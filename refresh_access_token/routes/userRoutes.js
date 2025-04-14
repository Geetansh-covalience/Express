import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  authenticateToken,
  checkLoginStatus,
} from "../middleware/userAuthentication.js";
import User from "../models/user.js";
import Token from "../models/token.js";
dotenv.config({ path: "../config/.env" });

let router = express.Router();

router.get("/", (req, res) => {
  res.send(
    `<form method="POST" action="/registerUser">
        <h1>Register</h1>
        <input type="text" name="username" placeholder="Username" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Register</button>
    </form><br>
    
    <a href = "/login">Login</a>`
  );
});

router.post("/registerUser", async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ where: { username } });

  if (existingUser) {
    return res.send(`Already Registered <a href = "/login">Login here<a/>`);
  }

  const hashedPass = bcrypt.hashSync(password, 12);
  const accessToken = jwt.sign({ username }, process.env.ACCESS_SECRET_TOKEN, {
    expiresIn: "1m",
  });

  const refreshToken = jwt.sign(
    { username },
    process.env.REFRESH_SECRET_TOKEN,
    { expiresIn: "2h" }
  );

  await Token.create({ uid: user.uid, token: refreshToken });

  await User.create({ username, password: hashedPass });
  const user = await User.findOne({ where: { username } });

  res.cookie("token", accessToken, { httpOnly: true, maxAge: 60 * 1000 });

  res.redirect("/home");
});

router.get("/login", (req, res) => {
  if (req.cookies.token) {
    res.redirect("/home");
  } else {
    res.send(
      `<form method="POST" action="/loginUser">
                <h1>Login</h1>
                <input type="text" name="username" placeholder="Username" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">Login</button>
            </form><br>            
            <a href = "/">Register</a>`
    );
  }
});

router.post("/loginUser", async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username:username } });

  if (!user) {
    return res.send("User not found. <a href='/'>Go back</a>");
  }

  const isMatch = bcrypt.compareSync(password, user.password);
  if (isMatch) {
    const accessToken = jwt.sign(
      { username },
      process.env.ACCESS_SECRET_TOKEN,
      {
        expiresIn: "15m",
      }
    );

    const refreshToken = jwt.sign(
      { username },
      process.env.REFRESH_SECRET_TOKEN,
      { expiresIn: "2h" }
    );

    await Token.create({ uid: user.uid, token: refreshToken });

    res.cookie("token", accessToken, { httpOnly: true, maxAge: 60 * 1000 });
    res.redirect("/home");
  } else {
    res.send("Incorrect password. <a href='/login'>Try again</a>");
  }
});

router.get("/home",checkLoginStatus,authenticateToken, async (req, res) => {
  res.send(`Welcome !!!  <a href = "/logout">LogOut</a>`);
});

router.get("/logout",checkLoginStatus, async (req, res, next) => {
  let token = req.cookies.token;
  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, async (err, decoded) => {
    let user = await User.findOne({
      where: { username: decoded.username },
    });

    let validToken = await Token.findOne({
      where: { uid: user.uid },
    });

    if (validToken) {
      await Token.destroy({
        where: { uid: user.uid },
      });
    }

    res.clearCookie("token");
    res.send(`Logged Out succesfully <a href = "/login">Login</a>`);
  });
});

export default router;
