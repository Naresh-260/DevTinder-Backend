const express = require("express")

const app = express()
const {checkAdminAuth,checkUserAuth} = require("./middlewares/auth")


app.get("/login",(req,res)=>{
    res.send("login Successful")
})
app.use("/admin",checkAdminAuth)

app.get("/user/userData",checkUserAuth,(req,res)=>{
    res.send("set all user Data")
})
app.get("/admin/allData",(req,res)=>{
   res.send("sent all Data");
})

app.put("/admin/updateData",(req,res)=>{
    res.send("Data Updated")
})
app.delete("/admin/deleteData",(req,res)=>{
    res.send("Data Deleted")
})
app.listen(7777,()=>{
    console.log("Server is listening on 7777 port")
})


