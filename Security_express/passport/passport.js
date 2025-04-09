import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt"
import mysql2 from "mysql2"
let connection = mysql2.createConnection({
    database:"users",
    user:"geetansh",
    password:"geetansh",
    host:"localhost"
})

connection.connect((err) => {
    if(err) console.log(err);
    else console.log("connected to db");
});


passport.use(new Strategy((username,password,done) => {
    connection.query(`Select * from users where username = ?`,[username],(err,result) => {
        if(err) return done(err);

        let user = result[0];
        if(!user) return done(null,false,{mssg:"No user found"});

        if(bcrypt.compare(password,user.password)) return done(null,user);
        else return done(null,false,{mssg:"incorrect pass"});
    })
}))

passport.serializeUser((user,done) => done(null,user.userId))
passport.deserializeUser((id,done) => {
    connection.execute(`select * from users where userId = ?`,[id],(err,res) => {
        done(err,res[0]);
    })
})

export {
    connection,
    bcrypt
}