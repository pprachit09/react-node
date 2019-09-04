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
    update,
    list,
    listRelated,
    listCategory,
    listBySearch,
    listSearch,
    photo
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

//list products as per query parameters
router.get('/products', list)

//realted products
router.get('/products/related/:productId', listRelated)
//categories of product
router.get('/products/categories', listCategory)
//search product
router.post("/products/by/search", listBySearch);
//send photo of product
router.get('/product/photo/:productId', photo)
//search product based on category and keyword
router.get('/products/search', listSearch)


router.param('userId', userById)
router.param('productId', productById)

module.exports = router