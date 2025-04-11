import express from "express";
import joi from "joi"
let app = express();
import os from "os"
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get("/", (req, res) => {
  res.send(`
          <form method="POST" action="/submit">
            <input type="text" name="username" placeholder="Username" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <input type="password" name="cnfrmPass" placeholder="cnfrmPass" required />
            <input type="date" name="date" placeholder="DOB"  />
            <button type="submit">Login</button>
        </form>`);
});

let schema = joi.object({
    username:joi.string().min(1).max(10).required().messages({
        'string.base':"Input must be a string",
        'string.min':"username should have min length 1",
        'string.max':"username should have max Length 10",
        'any.required':"Required Field"
    }),

    email:joi.string().email().messages({
        'string.base':"Input must be a string",
        'string.email':"Email must be valid",
        'any.required':"Required Field"
    }),

    password:joi.string().min(6).max(10).required().messages({
        'string.base':"Input must be a string",
        'string.min':"password should have min length 6",
        'string.max':"password should have max Length 10",
        'any.required':"Required Field"
    }),

    // cnfrmPass:joi.string().valid(joi.ref('password')).messages({
    //     'string.base':"Input must be a string",
    //     'any.only':"Pass not valid",
    //     'any.required':"Required Field"
    // }),

    cnfrmPass:joi.string().custom((value,helper) => {
        if(value !== helper.state.parent.password){
            return helper.error("Does not match")
        }

        return value
    }).messages({
        'string.base':"Input must be a string",
        'any.only':"Pass not valid",
        'any.required':"Required Field"
    }),

    date: joi.date().default("01-01-2004")
    .required()
    .messages({
      'date.base': 'dob must be a valid date',
      'date.before': 'dob must be before January 1, 2005',
      'date.after': 'dob must be after January 1, 1998',
      'any.required': 'dob is required',
    })
})

let schema1 = joi.array().items(joi.valid("hello","hi")).required();

app.post("/submit",(req,res) => {
    let result = schema.validate(req.body)
    if(result.error){
        res.json(result.error.details)       
    }
    
    else{
        res.send(result)
    }
})

app.listen(1000);
