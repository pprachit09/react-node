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
        isAdmin,
        read,
        update,
        purchaseHistory
    } = require('../controllers/user')

router.post('/signup', userSignupValidator, signup)
router.post('/signin', signin)
router.get('/logout', logout)

router.get('/secret/:userId', requiredSignIn, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
})

//read user profile
router.get('/user/:userId', requiredSignIn, isAuth, read)

//update user profile
router.put('/user/:userId', requiredSignIn, isAuth, update)

//get all orders
router.get('/orders/by/user/:userId', requiredSignIn, isAuth, purchaseHistory)

router.param('userId', userById)

module.exports = router