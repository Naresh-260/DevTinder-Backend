const express = require("express")

const app = express()

app.get("/login",(req,res)=>{
    try{
        throw new Error("Some Error")
    }
    catch(err){
        res.status(401).send("Your Credentials are wrong!")
    }
})
app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(501).send("Oops something went wrong!")
    }

 

})

app.listen(7777,()=>{
    console.log("Server is listening on 7777 port")
})


