const express = require("express")
const authRouter = express.Router()
const {User} = require("../models/user")
const bcrypt = require("bcrypt")
const {validateSignUp} = require("../utils/validateSignUp")

// post data
authRouter.post("/signup",async (req,res)=>{
    try{
    //Validate the user data
    validateSignUp(req)
    const {firstName,lastName,
        emailId,password,
        Bio,PhotoUrl,
        age,gender,skills
    } = req.body;
    const hashedPassword = await bcrypt.hash(password,10)

    const instance = new User({
        firstName,
        lastName,
        emailId,
        password:hashedPassword,
        Bio,
        PhotoUrl,
        age,gender,skills
    })
    const newUser = await instance.save()
    const token = await newUser.getJwt();
    res.cookie("authToken", token, {expires: new Date(Date.now() + 3600000)}); 
    res.json({message:"User Data",data : newUser})
    }
    catch(error){
        console.log(error)
        res.status(501).send(error.message)
    }
})

authRouter.post("/login",async (req,res)=>{
    const {emailId,password} = req.body;
    try{
        const user = await User.findOne({emailId:emailId});
        if(!user){
            res.status(400).send("Invalid Credentilas")
        }
        else{
            const isPasswordMatch = await user.isPasswordValid(password);
            if(!isPasswordMatch){
                res.status(400).send("Invalid Credentilas!")
            }
            else{
                const token = await user.getJwt();
                res.cookie("authToken", token, {expires: new Date(Date.now() + 3600000)}); // 1 hour
                res.json({message:"User Data",data : user})
            }
        }
    }
    catch(error){
        res.status(500).send(error.message)
    }
})

authRouter.post("/logout",async (req,res)=>{
    try{
        //res.cookie("authToken", null, {expires: new Date(0)});
        res.clearCookie("authToken");
        res.send("Logout Successful")
    }
    catch(error){
        res.status(500).send(error.message)
    }
})

module.exports = {authRouter}