const express = require("express")
const profileRouter = express.Router()
const {checkUserAuth} = require("../middlewares/auth")

profileRouter.get("/profile",checkUserAuth,async (req,res)=>{
    try{
        const userData = req.user;
        res.send(userData);
    }
    catch(error){
        res.status(401).send("Invalid token")
    }

})


module.exports = {profileRouter}