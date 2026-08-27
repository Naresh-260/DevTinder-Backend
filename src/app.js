const express = require("express")

const app = express()
app.get("/",(req,res)=>{
    res.send("this is my first page")
})

app.get("/hi",(req,res)=>{
    res.send("Hi Hello World")
})

app.get("/hey",(req,res)=>{
    res.send("Hey I am Here!")
})

app.get("/get",(req,res)=>{
    res.send("here are my details")
})

app.listen(7777,()=>{
    console.log("Server is listening on 7777 port")
})


