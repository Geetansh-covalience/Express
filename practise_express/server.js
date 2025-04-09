import express, { json } from "express";
import session from "express-session";
import router from "./routes.js";
let app = express();
app.use(session({
    secret:"Ge3$R$ed@we$E!W23es",
    resave:false,
    saveUninitialized:false,
    cookie:("user","pass",{
        maxAge:15*1000,
        httpOnly:true,
    })
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/",router);

app.listen(3000);
