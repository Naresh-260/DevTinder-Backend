const validator = require("validator")

const validateProfileEdit = (req) => {
    const {firstName,lastName,emailId,age,
        gender,Bio,PhotoUrl,skills} = req.body;

    if(firstName && !validator.isLength(firstName, { min: 2, max: 100 })) {
        throw new Error("First name is required and must be between 2 and 100 characters long");
    }
    if(lastName && !validator.isLength(lastName, { min: 2, max: 100 })) {
        throw new Error("Last name is required and must be between 2 and 100 characters long");
    }
    if(emailId && !validator.isEmail(emailId)) {
        throw new Error("Please enter a valid email address");
    }
    if(age && !validator.isInt(age.toString(), { min: 18, max: 100 })) {
        throw new Error("Age must be a number between 18 and 100");
    }
    if(gender && !validator.isIn(gender, ["male", "female", "other"])) {
        throw new Error("Gender must be either male, female or other");
    }
    if(Bio && !validator.isLength(Bio, { min: 0, max: 500 })) {
        throw new Error("Bio must be less than 500 characters long");
    }
    if(PhotoUrl && !validator.isURL(PhotoUrl)) {
        throw new Error("Please enter a valid URL for the photo");
    }
    if(skills && (skills.length < 1 || skills.length > 10)) {
        throw new Error("Skills must be between 1 and 10");
    }
}

module.exports = {validateProfileEdit}
