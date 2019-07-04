const express = require('express')
const router = express.Router()

//import validator
const { userSignupValidator } = require('../validator/app')

//import controllers
const { signup } = require('../controllers/user')

router.post('/signup', userSignupValidator, signup)

module.exports = router