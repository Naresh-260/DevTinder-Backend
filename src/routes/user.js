const express = require("express")
const {checkUserAuth} = require("../middlewares/auth")
const {ConnectionRequest} = require("../models/ConnectionRequest")
const { User } = require("../models/user")

const userRouter = express.Router()

const USER_FIELDS = "firstName lastName age gender PhotoUrl skills"

userRouter.get("/user/requests/received",checkUserAuth, async (req,res)=>{
    try{
        const loggedInUserId = req.user._id
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUserId,
            status: "interested"}).populate("fromUserId",USER_FIELDS)
    
        res.json({message:"Your received connection requests",
            connectionRequests:connectionRequests})
    }
    catch(err){
        res.status(500).send(err.message)
    }
})

userRouter.get("/user/connections",checkUserAuth, async (req,res)=>{
    try{
        const loggedInUserId = req.user._id
        const connections = await ConnectionRequest.find({
            $or:[
                { toUserId: loggedInUserId,status: "accepted"},
                { fromUserId: loggedInUserId,status: "accepted"}
            ]
        }).populate("fromUserId toUserId",USER_FIELDS)
  

        const connectionData = connections.map((connection)=>{
            if(connection.fromUserId._id.equals(loggedInUserId)){
                return connection.toUserId
            }
            return connection.fromUserId
        })
        res.json({message:"Your connections",
            connections:connectionData})

    }
    catch(err){
        res.status(500).send(err.message)
    }
})

userRouter.get("/user/feed",checkUserAuth,async (req,res)=>{
    try{
        const limit = parseInt(req.query.limit);
        const page = parseInt(req.query.page);
        skip = (page-1) * limit;
        const loggedInUser = req.user;
        const connections = await ConnectionRequest.find({
            $or:[{toUserId:loggedInUser._id},{fromUserId:loggedInUser._id}]
        }).select("fromUserId toUserId")

        const hideUsersFromFeed = new Set()

        connections.forEach(connection=>{
            hideUsersFromFeed.add(connection.fromUserId.toString())
            hideUsersFromFeed.add(connection.toUserId.toString())
        })

        const users = await User.find({
            $and : [ {_id : {$nin:Array.from(hideUsersFromFeed)}},
                    { _id : {$ne:loggedInUser._id}}
                    ]
        }).select(USER_FIELDS).skip(skip).limit(limit)

        res.json({users:users})

    }
    catch(err){
        res.status(500).send(err.message)
    }
})
module.exports = {userRouter}