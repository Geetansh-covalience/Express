import express from "express";
import { body, matchedData, validationResult } from "express-validator";

let app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get("/", (req, res) => {
  res.send(`
          <form method="POST" action="/submit">
            <input type="text" name="username" placeholder="Username" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>`);
});

let validations = [
    body('username').isLength({min:2}).withMessage("Minimum 2 char length").isLength({max:10}).withMessage("Max 10 chars allowed"),
    body('password').isLength({min:6}).withMessage("Minimum length 6").isLength({max:10}).withMessage("Max 10 length"),
    body('email').isEmail().withMessage("Email is not correct"),
    body('')
]

app.post("/submit",validations,(req,res) => {
    let result = validationResult(req);
    if(result.isEmpty()){
        let data= matchedData(req);
        res.status(200).send(`Hello Mr.${data.username} and your password is ${data.password}`)
    }
    
    else{
        res.send({error:result.array()})
    }
})

app.listen(1000);
