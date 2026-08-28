const express = require("express")
const {connectDB} = require("./config/database")
const {User} = require("./models/user")

const app = express()

const userData = {
    firstName : "peter",
    lastName : "parkar",
    emailId : "peter@gmail.com",
    password : "1234567",
    age : 16,
    gender: "male"
}

app.post("/signup",async (req,res)=>{
    try{
    const instance = new User(userData)
    await instance.save()
    res.send("Data posted Successfully")
    }
    catch(error){
        console.log(error)
        res.status(501).send("Something Went wrong!")
    }
})

connectDB().then(()=>{
    app.listen(7777,()=>{
    console.log("Server is listening on 7777 port")
})
    console.log("Connected to DB")
}).catch((err)=>{
    console.log(err)
    console.log("Database connection cannot be established")
})



