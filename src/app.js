const express = require("express")
const {connectDB} = require("./config/database")
const cookieParser = require("cookie-parser");
const {authRouter} = require("./routes/auth")
const {profileRouter} = require("./routes/profile")
const {requestRouter} = require("./routes/request")
const {userRouter} = require("./routes/user")
const cors = require("cors")

const app = express()
app.use(cors({
    origin : "http://localhost:7777",
    credentials : true
}))
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);


connectDB().then(()=>{
    app.listen(7777,()=>{
    console.log("Server is listening on 7777 port")
})
    console.log("Connected to DB")
}).catch((err)=>{
    console.log(err)
    console.log("Database connection cannot be established")
})



