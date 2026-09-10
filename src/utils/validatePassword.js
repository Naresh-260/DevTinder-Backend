const validator = require("validator");

const validatePassword = (req)=>{
    const {password} = req.body;

    if(!validator.isStrongPassword(password)){
        throw new Error("Password must be at least 8 characters long and contain a mix of uppercase, lowercase, numbers, and special characters");
    }
    return true;
}

module.exports = {validatePassword}