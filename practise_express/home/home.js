import express from "express";
import { users } from "../auth/login_logout.js";
import { isLoggedIn } from "../middlewares/session.js";
let homeRouter = express.Router();

homeRouter.get("/home",isLoggedIn,(req,res) => {
    let userLoggedIn = users.find(elem => elem.username === req.session.user.username);

    if(userLoggedIn && userLoggedIn.role === "admin"){
        res.send(`<a href = "/listFood">Food List</a> <br><br>
            <a href = "/addFood">Food Add</a>
        `)
    }

    else if(userLoggedIn && userLoggedIn.role === "intern"){
        res.send(`<a href = "/listFood">Food List</a> <br><br>`)
    }

    else {
        res.send("Hello Client")
    }
})

export { homeRouter};
