const express = require('express')
const server = require('./Config/Server')
const cors = require('cors')
const UserRoute = require('./Route/UserRoute')
const BlogRote = require('./Route/BlogRoute')

const app = express()
app.use(express.json())

app.use(cors())
app.use("/",UserRoute)
app.use("/",BlogRote)
app.listen(9595,()=>{
    console.log("port is running")
    server()
})