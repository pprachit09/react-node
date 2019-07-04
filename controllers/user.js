const User = require('../models/users')
const { errorHandler } =require('../helpers/dbErrorHandler')

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