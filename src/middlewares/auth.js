
const jwt = require("jsonwebtoken");
const {User} = require("../models/user")
const checkUserAuth = async (req,res,next)=>{
    const cookies = req.cookies;
    const {authToken} = cookies;
    if(!authToken){
        res.status(401).send("Unauthorized")
    }
    try{
        const decodedToken =  await jwt.verify(authToken, "DevTinder@790");
        const {userId} = decodedToken;
        const userData = await User.findById(userId);
        if(!userData){
            res.status(404).send("User not found!")
        }
        req.user = userData;
        next();
    }
    catch(error){
        res.status(401).send(error.message)
    }
}

module.exports = {checkUserAuth}