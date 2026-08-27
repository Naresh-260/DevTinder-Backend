const express = require("express")

const app = express()

app.use("/user",[(req,res,next)=>{
    //res.send("Request Handler 1");
    next();
},(req,res,next)=>{
    //res.send('Response 2');
    next();
},(req,res,next)=>{
    //res.send("Response 3");
    next();
  
},(req,res,next)=>{
    //res.send("Response 4");
    next()
}])


app.listen(7777,()=>{
    console.log("Server is listening on 7777 port")
})


