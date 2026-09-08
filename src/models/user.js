const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
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
        minLength:4,
        maxLength:25,
        unique:true,
        require:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("email is not valid" + value);
            }
        }
    },
    password :{
        type:String,
        require:true,
        minLength:4,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Your passeord is not strong" + value);
            }
        }
        

    },
    age : {
        type:Number,
        min:18,
        max:120,

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
        default : "https://tse1.mm.bing.net/th/id/OIP.AO3bDsSVrluj5MZj3UHkPAHaHa?r=0&pid=Api&P=0&h=180",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Your Photo URL is not valid" + value);
            }
        }
    },
    Bio : {
        type : String,
        minLength : 4,
        maxLength : 100,
        default : "Enter your Bio Here in max 100 words"
    },
    skills : {
        type : [String]

    }
    
},{ timestamps: true })


userSchema.methods.getJwt = async function () {
    const user = this;
    try {
    const token = await jwt.sign({userId: user._id}, "DevTinder@790", {expiresIn: "1h"});
    return token;
    }
    catch (error) {
        throw new Error("Error generating JWT: " + error.message);
    }
    
}

userSchema.methods.isPasswordValid = async function (passwordByUserInput) {
    const user = this;
    const hashedPassword = user.password;
    return await bcrypt.compare(passwordByUserInput, hashedPassword);
}

const User = mongoose.model("User",userSchema)

module.exports = {User}