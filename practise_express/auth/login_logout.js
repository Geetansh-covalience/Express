import express from "express";

let login_logoutRouter = express.Router();
login_logoutRouter.use(express.json());
login_logoutRouter.use(express.urlencoded({ extended: true }));

let users = [
  { username: "g", pass: "123", role: "intern" },
  { username: "j", pass: "123", role: "intern" },
  { username: "gj", pass: "123", role: "client" },
  { username: "demo", pass: "123", role: "admin" },
];

login_logoutRouter.get("/", (req, res) => {
  if (req.session.user) {
    res.redirect("/home");
  } else {
    res.send(`<form action="/submit" method="POST">
      <label for="username">username:</label>
      <input type="text" id="username" name="username" required />
      <br><br>
      <label for="password">password:</label>
      <input type="password" id="password" name="password" required />
      <br><br>
      <button type="submit">Submit</button>
  </form>`);
  }
});

login_logoutRouter.post("/submit", (req, res) => {
  let { username, password } = req.body;

  let user = users.find(
    (user) => user.username === username && user.pass === password
  );

  if (user) {
    req.session.user = { username: username, password: password };

    res.redirect("/home");
  } else {
    res.send("Invalid credential");
  }
});

login_logoutRouter.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) res.send(err);
    else res.redirect("/home");
  });
});

export { login_logoutRouter, users };
