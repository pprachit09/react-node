const express = require('express')
const router = express.Router()

const { 
    requiredSignIn, 
    userById,
    isAuth,
    isAdmin 
} = require('../controllers/user')

const {
    create
} = require('../controllers/product')

router.post('/product/create/:userId', 
    requiredSignIn,
    isAdmin,
    isAuth,
    create
)

router.param('userId', userById)

module.exports = router