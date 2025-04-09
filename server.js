// import express from "express";
// import cookieParser from "cookie-parser";
// import user from "./router/router.js";
// import img from "./router/img.js"
// import path from "path"
// import ejs from "ejs"
// import { dirname } from "path";
// const app = express();

// app.set("view engine","ejs");
// app.set("views",path.resolve(path.join(process.cwd()),"views"))

// app.get("/" , (req,res) => {
//   res.render("index",{name:"Geetansh"})
//   console.log(path.resolve(path.join(process.cwd()),"views"));
  
// })
// app.use("/user",user)
// app.use("/img",img)
// app.use((req,res) => {
//   res.status(404).send("Galat Page ha")
// })
// app.use("/js",express.static('public'))
// app.use("/text",express.static('public/txt'))
// app.use("/image",express.static('public/img'))
// app.use("/html",express.static('public/txt/html.html'))
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// app.get("/", (req, res) => {
//   res.send(req.cookies);
// });

// app.get("/user/:name", (req, res) => {
//   try {
//     res.cookie(`${req.params.name}`, `${req.params.name}`, {
//       httpOnly:true,
//       maxAge: 360000,
//       // path:"/login",
//       //   domain: ".localhost:3000",
//     //   secure:true,
//       sameSite:"Lax",
//       priority:"high",
//       // signed:true
//     });

//     res.send("cookies set");
//   } catch (err) {
//     res.send(err);
//     console.log(err);
//   }
// });

// app.get("/get-cookie", (req, res) => {
//   const buffer = Buffer.from(JSON.stringify(req.cookies));

//   if (buffer) {
//     res.end(buffer);
//   } else {
//     res.send("No user");
//   }
// });

// app.get("/delete-cookie", (req, res) => {
//   try {
//     res.clearCookie("user");
//     res.send("cookie deleted");
//   } catch (err) {
//     res.send("error while deleting cokie");
//   }
// });

import express from "express";
import path from "path";
import ejs from "ejs";
 
const app = express();
 
// Set EJS as the view engine
app.engine("ejs",ejs.renderFile);
app.set("view engine", "ejs");
app.set("views", path.resolve(process.cwd(), "views"));
 
app.get("/", (req, res) => {
  res.render("index",{name: "Geetansh"});  // This should work if EJS is installed
});
 
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});