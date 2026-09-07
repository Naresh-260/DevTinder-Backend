const validator = require("validator")

const validateSignUp = (req)=>{
    const {firstName,lastName,emailId,password} = req.body;
    if(!firstName || !lastName){
        throw new Error("please Enter FirstName or LastName correctly!")
    }
    if(!validator.isEmail(emailId)){
        throw new Error("please enter valid Email" + emailId)
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("please Enter a valid Password")
    }
}

module.exports = {validateSignUp}