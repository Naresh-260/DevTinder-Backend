const mongoose = require("mongoose");
const {User} = require("./user")

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type:mongoose.Schema.Types.ObjectId,
        ref :"User",
        required:true,
    },
    toUserId: {
        type:mongoose.Schema.Types.ObjectId,
        ref :"User",
        required:true,
    },
    status: {
        type:String,
        enum :{ 
            values:["interested","ignored","accepted","rejected"],
            message : `{VALUE} is not supported`
        }
    }
    
},{timestamps:true})

connectionRequestSchema.index({fromUserId:1,toUserId:1})
connectionRequestSchema.pre("save", function(){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to yourself");
    }
   
})

const ConnectionRequest = mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports = {ConnectionRequest}