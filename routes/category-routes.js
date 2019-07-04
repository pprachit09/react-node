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
} = require('../controllers/category')

router.post('/category/create/:userId', 
    requiredSignIn,
    isAdmin,
    isAdmin,
    create
)

router.param('userId', userById)

module.exports = router