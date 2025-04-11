import jwt from "jsonwebtoken";

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.redirect("/");

  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
    if (err) return res.redirect("/");
    console.log(decoded);
    
    req.user = decoded;
    next();
  });
};

export{
    authenticateJWT
}