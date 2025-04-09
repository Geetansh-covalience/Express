import express from "express";
import path from "path";
import ejs from "ejs";
const app = express();
app.engine("ejs", ejs.renderFile);
app.set("view engine", "ejs");
app.set("views", path.resolve(path.join(process.cwd()), "views"));


app.get("/home", (req, res) => {
  res.render("index", { title:"Post    ",
    users:[
      { name: "Alice" }, { name: "Bob" }, { name: "Charlie" }
    ]
   });
  console.log(path.resolve(path.join(process.cwd()), "views"));
});
 
app.listen(1000);