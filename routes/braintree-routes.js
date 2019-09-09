const express = require("express")
const router = express.Router()

const { requiredSignIn, isAuth, userById } = require("../controllers/user")
const { generateToken, processPayment } = require("../controllers/braintree")

router.get('/braintree/getToken/:userId', requiredSignIn, isAuth, generateToken)
router.post('/braintree/payment/:userId', requiredSignIn, isAuth, processPayment)

router.param('userId', userById)

module.exports = router