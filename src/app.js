const express = require("express")

const app = express()

//CRUD Operations
app.post("/user",(req,res)=>{
    res.send("Data is saved Sucessfully into DataBase")
})
app.get("/user",(req,res)=>{
    res.send({"firstName": "Naresh","lastName" : "Lingammagari"})
})

app.put("/user",(req,res)=>{
    res.send("data is updated")
})
app.delete("/user",(req,res)=>{
    res.send("Data is deleted is Successfully")
})


app.listen(7777,()=>{
    console.log("Server is listening on 7777 port")
})


