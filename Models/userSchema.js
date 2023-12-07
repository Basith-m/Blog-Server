const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: [3, `Must be at least 3, got {VALUE}`]
    },
    email: {
        type: String,
        required: true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    profile:{
        type:String
    }
})

const users = mongoose.model("users",userSchema)

module.exports = users