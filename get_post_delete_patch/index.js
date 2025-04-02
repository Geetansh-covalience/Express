import express from "express";
import session from "express-session";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
let app = express();

import { Router } from "express";

const router = express.Router()
// app.use(
//   session({
//     secret: "h)75SA#@t9lkjh",
//     saveUninitialized: false,
//     resave: false,
//     cookie: {
//       httpOnly: false,
//       maxAge: 30000,
//     },
//   })
// );

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// let users = [
//   {id:1,name:"Geetansh"},
//   {id:2,name:"Jain"},
//   {id:3,name:"Geetansh Jain"}
// ]

// app.get("/",(req,res) => {
//   res.status(200).send("hello")
// })

// app.get("/user",(req,res) => {
//   res.json({users})
// })

// app.put("/user/:id/:username",(req,res) => {
//   let {id,username} = req.params;
//   const userId = parseInt(id);
//   const user = users.find(user => user.id === userId);

//   user.name = username

//   res.status(200).send("data updated")
// })

// app.delete("/user/:id",(req,res) => {
//   let {id} = req.params;
//   const userId = parseInt(id);
//   users.splice(userId,1)

//   res.status(200).send("data updated")
// })

// app.get("/", (req, res) => {
//   if (req.session.user && req.session.user.username === "geet") {
//     res.status(200).send("hello");
//   } else {
//     res.status(500).send(` <form action="/submit" method="POST">
//         <label for="username">username:</label>
//         <input type="text" id="username" name="username" required />
//         <br><br>
//         <label for="password">password:</label>
//         <input type="password" id="password" name="password" required />
//         <br><br>
//         <button type="submit">Submit</button>
//     </form>`);
//   }
// });
// app.get("/buffer", (req, res) => {
//   const buffer = Buffer.from("Hello, this is a binary buffer");
//   res.send(buffer);
// });
// app.get("/json", (req, res) => {
//   res.json({ status: "OK", message: "Data fetched successfully" });
// });

// app.post("/submit", (req, res) => {
//   let { username, password } = req.body;

//   req.session.user = { username: `${username}`, password: `${password}` };

//   if (
//     req.session.user.username === "geet" &&
//     req.session.user.password === "123"
//   ) {
//     res.redirect("/json");
//   } else {
//     res.redirect("/");
//   }
// });

// app.get("/profile", (req, res) => {
//   let filePath = dirname(fileURLToPath(import.meta.url))
//   // console.log(dirname(process.cwd()));
//   res.sendFile(`${filePath}/express.png`, {
//     headers: {
//       "Content-Disposition": 'attachment;filename="express.png"',
//     },
//   });
// });

app.listen(3000);
