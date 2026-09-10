const express = require("express")
const profileRouter = express.Router()
const {checkUserAuth} = require("../middlewares/auth")
const {validateProfileEdit} = require("../utils/validateUpdate")
const {validatePassword} = require("../utils/validatePassword")
const bcrypt = require("bcrypt")

profileRouter.get("/profile/view",checkUserAuth,async (req,res)=>{
    try{
        const userData = req.user;
        res.send(userData);
    }
    catch(error){
        res.status(401).send("Invalid token")
    }

})

profileRouter.patch("/profile/edit",checkUserAuth,async (req,res)=>{
    try{
        validateProfileEdit(req);
        const allowedUpdates = ["firstName","lastName", 
                                "Bio","PhotoUrl","emailId","age","gender","skills"];
        Object.keys(req.body).every((key)=>{
            if(!allowedUpdates.includes(key)){
                res.status(400).send("Invalid data for profile edit")
            }
        })
        Object.keys(req.body).every(key=> req.user[key] = req.body[key])
        await req.user.save();

        res.json({message:"Profile updated successfully", user:req.user})

    }
    catch(error){
        res.status(500).send(error.message)
    }
})

profileRouter.patch("/profile/forgotpassword",checkUserAuth,async (req,res)=>{

    try{
    validatePassword(req);
    const newPassword = req.body.password;
    const hashedPassword = await bcrypt.hash(newPassword,10);
    req.user.password = hashedPassword;
    await req.user.save();
    res.json({message:"Password updated successfully"})
    }
    catch(err){
        res.status(400).send(err.message)
    }

} )

module.exports = {profileRouter}