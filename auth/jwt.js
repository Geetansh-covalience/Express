import jwt from "jsonwebtoken";

let payload = {
    user:"geetansh",
    role:"admin"
}

const secret = "G%#$EfR#$rfSW@f";

const token = jwt.sign(payload,secret,{
    expiresIn:'1h',
    algorithm:"HS256",
})

console.log(token);
console.log();

let verify = jwt.verify(token,secret,{maxAge:"1h"},(err,data) => {
    if(err) console.log(err);
    else console.log(data);
    console.log(); 
});

let decode = jwt.decode(token);
console.log(decode);


