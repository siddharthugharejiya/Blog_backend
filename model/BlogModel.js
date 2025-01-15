const mongoose = require('mongoose')

const BlogSchema = mongoose.Schema({
     title : String,
     image : String,
    description : String,
    userId : { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    
})

const BlogModel = mongoose.model("Blog",BlogSchema)
module.exports = BlogModel