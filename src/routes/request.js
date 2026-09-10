const express = require("express")
const requestRouter = express.Router()
const {checkUserAuth} = require("../middlewares/auth")
const {User} = require("../models/user")
const {ConnectionRequest} = require("../models/ConnectionRequest")


requestRouter.post("/request/send/:status/:userId",checkUserAuth,async (req,res)=>{
    try{
        const {status,userId} = req.params;
        const isStatusAllowed = ["interested","ignored"]
        if(!isStatusAllowed.includes(status)){
            throw new Error("Invalid status value")
        }
        const toUser = await User.findById(userId);
        if(!toUser){
           throw new Error("User not found")
        }

        const requestData = await ConnectionRequest.findOne({
            $or:[
                {fromUserId:req.user._id,toUserId:userId},
                {fromUserId:userId,toUserId:req.user._id}
            ]
        })
        if(requestData){
            throw new Error("Connection request already exists between these users")
        }
        const newRequest = new ConnectionRequest({
            fromUserId:req.user._id,
            toUserId:userId,
            status:status
        })
        await newRequest.save()
        res.json({message: `${req.user.firstName} ${req.user.lastName} is ${status} ${toUser.firstName} ${toUser.lastName}`,
            newRequest:newRequest
        });
    }
    catch(error){
        res.status(500).send(error.message)
    }
})

requestRouter.post("/request/review/:status/:requestId",checkUserAuth,async (req,res)=>{
    try{
        const {status,requestId} = req.params;
        const isStatusAllowed = ["accepted","rejected"]
        if(!isStatusAllowed.includes(status)){
            throw new Error("Invalid status value")
        }
        const loggedInUserId = req.user._id
        const requestData = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUserId,
            status: "interested"
        })
        if(requestData){
            requestData.status = status;
            await requestData.save();
            res.json({message: `Request ${status} successfully`,requestData:requestData})
        }
        else{
            throw new Error("Request not found or already reviewed")
        }
    }
    catch(error){
        res.status(500).send(error.message)
    }
})

module.exports = {requestRouter}