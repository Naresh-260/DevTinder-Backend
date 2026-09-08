const express = require("express")
const {connectDB} = require("./config/database")
const {User} = require("./models/user")
const {validateSignUp} = require("./utils/validateSignUp")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser");
const {checkUserAuth} = require("./middlewares/auth")

const app = express()

app.use(express.json());
app.use(cookieParser());

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
            const isPasswordMatch = await user.isPasswordValid(password);
            if(!isPasswordMatch){
                res.status(400).send("Invalid Credentilas!")
            }
            else{
                const token = await user.getJwt();
                res.cookie("authToken", token, {expires: new Date(Date.now() + 3600000)}); // 1 hour
                res.send("Login Successful")
            }
        }
    }
    catch(error){
        res.status(500).send(error.message)
    }
})

app.get("/profile",checkUserAuth,async (req,res)=>{
    try{
        const userData = req.user;
        res.send(userData);
    }
    catch(error){
        res.status(401).send("Invalid token")
    }

})

app.post("/sendConnectionRequest",checkUserAuth,async (req,res)=>{
    try{
        const userData = req.user
        res.send(userData.firstName + " " + userData.lastName + " has sent a connection request!");
    }
    catch(error){
        res.status(500).send(error.message)
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



