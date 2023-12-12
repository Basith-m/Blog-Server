const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
        min: [50, `Must be at least 50, got {VALUE}`]
    },
    userId:{
        type:String,
        required:true
    }
})

const blogs = mongoose.model("blogs",blogSchema)

module.exports = blogs