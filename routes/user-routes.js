const express = require('express')
const router = express.Router()

//import validator
const { userSignupValidator } = require('../validator/app')

//import controllers
const { signup, 
        signin, 
        logout, 
        requiredSignIn, 
        userById,
        isAuth,
        isAdmin 
    } = require('../controllers/user')

router.post('/signup', userSignupValidator, signup)
router.post('/signin', signin)
router.get('/logout', logout)

router.get('/secret/:userId', requiredSignIn, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
})

router.param('userId', userById)

module.exports = router