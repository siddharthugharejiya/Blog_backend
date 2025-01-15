const UserModel = require("../model/UserModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const { username, email, password } = req.body

    bcrypt.hash(password, 10, async (err, hash) => {
        let data = await UserModel.create({
            username,
            email,
            password: hash
        })
        res.json(data)
        console.log(data);
    })

}
const login = async (req, res) => {
    const { email, password } = req.body
    const data = await UserModel.findOne({ email: email })
    // console.log(data);
    if (!data) {
        res.json({ msg: "User Email Is Not Valid" })
    }
    let match = bcrypt.compare(password, data.password)
    if (!match) {
        res.json({ msg: "Password miss matched" })
    }
    const token = jwt.sign({userId : data._id},"SID")
   console.log(token);
   
    res.json({ data : data  , token : token })
     



}
module.exports = { register, login }