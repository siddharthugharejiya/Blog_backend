const mongoose = require('mongoose')
const server = async() =>{
    await mongoose.connect("mongodb+srv://multiera95:95@blog.o4xq8.mongodb.net/blogs?retryWrites=true&w=majority&appName=blog")
    console.log("Server is connected")
}
module.exports=server