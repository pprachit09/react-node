const User = require('../models/users')
const { errorHandler } =require('../helpers/dbErrorHandler')

const jwt = require('jsonwebtoken') //to generate token for sign in
const expressJwt = require('express-jwt') //for authorization

exports.signup = (req, res) => {
    const user = new User(req.body)
    console.log(req.body)
    user.save( (err, user) => {
        if(err){
            return res.status(400).json({
                err: errorHandler(err)
            })
        }
        user.salt = undefined
        user.hashPassword = undefined
        res.json({
            user
        })
    })
}

exports.signin = (req, res) => {
    //find user with email
    const { email, password } = req.body
    User.findOne({email}, (err, user) => {
        console.log(err, user)
        if(err || !user){
            return res.status(400).json({
                err: 'User with email does not exist... Please signup'
            })
        }
        //if user then check password
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: 'Invalid credentials'
            })
        }
        //if matches then generate signed token with user id and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
        //persist the token as 't' in cookie with expiry date
        res.cookie('t', token, { expire: new Date() + 9999 })
        //send response with user and token
        const { _id, name, email, role } = user
        return res.json({token, user: { _id, email, name, role }})
    })
}

exports.logout = (req, res) => {
    res.clearCookie('t')
    res.json({ message: "Logout success" })
}