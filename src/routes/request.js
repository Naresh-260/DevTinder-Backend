const express = require("express")
const requestRouter = express.Router()
const {checkUserAuth} = require("../middlewares/auth")

requestRouter.post("/sendConnectionRequest",checkUserAuth,async (req,res)=>{
    try{
        const userData = req.user
        res.send(userData.firstName + " " + userData.lastName + " has sent a connection request!");
    }
    catch(error){
        res.status(500).send(error.message)
    }
})

module.exports = {requestRouter}