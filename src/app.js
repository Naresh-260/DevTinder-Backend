const express = require("express")
const {connectDB} = require("./config/database")
const {User} = require("./models/user")

const app = express()

app.use(express.json());

// post data
app.post("/signup",async (req,res)=>{
    try{
    const instance = new User(req.body)
    await instance.save()
    res.send("Data posted Successfully")
    }
    catch(error){
        console.log(error)
        res.status(501).send("Something Went wrong!")
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
app.patch("/update",async (req,res)=>{
    try{
        const userId = req.body.userId;
        const data = req.body;
        await User.findByIdAndUpdate(userId,data);
        res.send("user data updated successfully");
    }
    catch(error){
        res.status(400).send("somthing went wrong!")
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



