const checkAdminAuth = (req,res,next)=>{
    console.log("Checking Authorization....")
    const token = "xyz";
    isAuthorized = token === "xyz"
    if(!isAuthorized){
        res.status(401).send("You Dont have permison to access this")
    }
    else{
        next();
    }
}

const checkUserAuth = (req,res,next)=>{
    console.log("Checking Authorization....")
    const token = "abc";
    isAuthorized = token === "xyz1"
    if(!isAuthorized){
        res.status(401).send("You Dont have permission to access this")
    }
    else{
        next();
    }
}

module.exports = {checkAdminAuth,checkUserAuth}