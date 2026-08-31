const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    firstName : {
        type:String,
        require:true,
        minLength:4,
        maxLength:25,
        trim:true,

    },
    lastName : {
        type:String,
        require:true,
        minLength:4,
        maxLength:25,
        trim:true,
    },
    emailId : {
        type:String,
        lowercase: true,
        unique:true,
        require:true,
        trim:true,
    },
    password :{
        type:String,
        require:true
    },
    age : {
        type:Number,
        min:18,

    },
   gender: {
    type: String,
    validate(value) {
        if (!["male", "female", "others"].includes(value)) {
            throw new Error("Please enter correct gender");
        }
    }
},
    PhotoUrl : {
        type :String,
        default : "https://tse1.mm.bing.net/th/id/OIP.AO3bDsSVrluj5MZj3UHkPAHaHa?r=0&pid=Api&P=0&h=180"
    },
    Bio : {
        type : String,
        minLength : 4,
        maxLength : 100,
    },
    skills : {
        type : [String]
    }
    
},{ timestamps: true })

const User = mongoose.model("User",userSchema)

module.exports = {User}