import express from "express";
import { userData, roles } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { authenticateJWT } from "../middleware/userAuthentication.js";
dotenv.config({ path: "../config/.env" });

let router = express.Router();
let roleOptions = roles.map((role) => {
  return `<option value="${role}">${role}</option>`;
});

router.get("/", (req, res) => {
  res.send(
    `
          <form method="POST" action="/registerUser">
          <h1>Register</h1>
            <input type="text" name="username" placeholder="Username" required />
            <input type="password" name="password" placeholder="Password" required />

            <select name="role" required>
                <option value="" disabled selected>Select Role</option>
                ${roleOptions}  
            </select>
            <button type="submit">Register</button>
          </form>

          <br>
          <p>Already user <a href = "/login">Login Here</a></p>
        `
  );
});

router.post("/registerUser", (req, res) => {
  let { username, password, role } = req.body;

  let hashedPass = bcrypt.hashSync(password, 12);
  let token = jwt.sign(
    { username },
    process.env.ACCESS_SECRET_TOKEN,
    {
      expiresIn: "15m",
    }
  );

  let newUser = { username, password: hashedPass, token, role };

  userData.push(newUser);

  res.cookie("accessToken", token, {
    httpOnly: true,
    expiresIn: 15 * 60 * 1000,
  });

  res.redirect("/home");
});

router.get("/home",authenticateJWT, (req, res) => {
    res.json(req.cookies);
});

router.get("/logout", (req, res) => {
    res.clearCookie("accessToken")
});

export default router;
