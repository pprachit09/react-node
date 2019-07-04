const express = require('express')
const router = express.Router()

const { 
    requiredSignIn, 
    userById,
    isAuth,
    isAdmin 
} = require('../controllers/user')

const {
    create,
    productById,
    read,
    remove,
    update
} = require('../controllers/product')

router.post('/product/create/:userId', 
    requiredSignIn,
    isAdmin,
    isAuth,
    create
)

//read the product
router.get('/product/:productId', read)

//delete the product
router.delete('/product/:productId/:userId', 
    requiredSignIn,
    isAdmin,
    isAuth,
    remove
)

//delete the product
router.put('/product/:productId/:userId', 
    requiredSignIn,
    isAdmin,
    isAuth,
    update
)

router.param('userId', userById)
router.param('productId', productById)

module.exports = router