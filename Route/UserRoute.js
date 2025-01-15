const express = require('express')
const { register, login } = require('../Controlller/UserController')

const UserRoute = express.Router()

UserRoute.post("/register",register)
UserRoute.post("/login",login)

module.exports=UserRoute