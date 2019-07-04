const express = require('express')
const router = express.Router()

//import validator
const { userSignupValidator } = require('../validator/app')

//import controllers
const { signup, signin, logout } = require('../controllers/user')

router.post('/signup', userSignupValidator, signup)
router.post('/signin', signin)
router.get('/logout', logout)

module.exports = router