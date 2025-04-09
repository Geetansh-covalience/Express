import express from "express";
import passport from "passport";
import { connection, bcrypt } from "./passport.js";
import session from "express-session";
let app = express();

app.use(
  session({
    secret: "GE354YBD$W@!FGV",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome Buddy!!!!!");
});

app.get("/login", (req, res) => {
  res.send();
});

app.post(
  "/submit",
  passport.authenticate("local",{
    successRedirect: "/home",
    failureRedirect: "/login",
  })
);

app.get("/home", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.redirect("/login");
  }
});

app.get("/register", (req, res) => {
  res.send(
    `
    <form method="POST" action="/registerUser">
      <input type="text" name="username" placeholder="Username" required />
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  `
  );
});

app.post("/registerUser", (req, res) => {
  const { username, email, password } = req.body;

  try {
    connection.query(
      "Select * from users where username = ?",
      [username],
      (err, result) => {
        let user = result[0];

        if (user) {
          req.logIn(user, (err) => (err ? err : res.redirect("/home")));
        } else {
          const hashedPassword = bcrypt.hashSync(password, 10);
          connection.query(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, hashedPassword],
            (err, results) => {
              err
                ? res.send(err)
                : req.logIn(user, (err) =>
                    err ? res.send(err) : res.redirect("/home")
                  );
            }
          );
        }
      }
    );
  } catch (err) {
    res.send(err);
  }
});

app.get("/logout", (req, res) => {
  req.logout((err, done) => {
    res.send("LogOut!!");
  });
});

app.listen(1000);
