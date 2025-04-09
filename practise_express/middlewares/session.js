import express from "express";
let router = express.Router();

let isLoggedIn = router.use((req,res,next) => {
    if(!req.session.user){
        return res.redirect("/")
    }

    next()
})

export {
    isLoggedIn
}