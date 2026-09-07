const express = require("express")
const {connectDB} = require("./config/database")
const {User} = require("./models/user")
const {validateSignUp} = require("./utils/validateSignUp")
const bcrypt = require("bcrypt")

const app = express()

app.use(express.json());

// post data
app.post("/signup",async (req,res)=>{
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
    await instance.save()
    res.send("Data posted Successfully")
    }
    catch(error){
        console.log(error)
        res.status(501).send(error.message)
    }
})

app.post("/login",async (req,res)=>{
    const {emailId,password} = req.body;
    try{
        const user = await User.findOne({emailId:emailId});
        if(!user){
            res.status(400).send("Invalid Credentilas")
        }
        else{
            const isPasswordMatch = await bcrypt.compare(password,user.password);
            if(!isPasswordMatch){
                res.status(400).send("Invalid Credentilas!")
            }
            else{
                res.send("Login Successful")
            }
        }
    }
    catch(error){
        res.status(500).send("Something went wrong!")
    }
})

//get one user
app.get("/user",async (req,res)=>{
    const userEmail = req.body.emailId;
    try{
        const users = await User.find({emailId:userEmail});
        if(users.length == 0){
            res.send("User not found!")
        }
        else{
            res.send(users);
        }
    }
    catch(error){
        res.send("Something went wrong!")  
    }
})

//feed api
app.get("/feed",async (req,res)=>{
    try{
        const users = await User.find({});
        res.send(users)
    }
    catch(error){
        res.send("Something went wrong!")  
    }
})
//delete API
app.delete("/delete",async (req,res)=>{
    const userId = req.body.userId
    try{
    await User.findByIdAndDelete(userId);
    res.send("user deleted Sucessfully");
    }
    catch(error){
        res.status(400).send("something went wrong!")
    }
})

//update
app.patch("/update/:id",async (req,res)=>{
    try{
        const userId = req.params.id
        const data = req.body;
        const allowedUpdates = ["lastName","age", "gender","Bio","skills"]
        const isUpdateAllowed = Object.keys(data).every((key)=>{
            return allowedUpdates.includes(key)
        })
        if(!isUpdateAllowed){
            throw new Error("update not allowed");
        }
        const skillData = req.body.skills;
        if(skillData?.length > 10){
            throw new Error("skills must be lessthan 10")
        }
        await User.findByIdAndUpdate(userId,data,{runValidators : true});
        res.send("user data updated successfully");
    }
    catch(error){
        res.status(400).send(error.message)
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



