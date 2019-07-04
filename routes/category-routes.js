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
    categoryById,
    read,
    update,
    remove,
    list
} = require('../controllers/category')

//to read category
router.get('/category/:categoryId', read)

//to create category
router.post('/category/create/:userId', 
    requiredSignIn,
    isAdmin,
    isAuth,
    create
)

//to update category
router.put('/category/:categoryId/:userId', 
    requiredSignIn,
    isAdmin,
    isAuth,
    update
)

//to update category
router.delete('/category/:categoryId/:userId', 
    requiredSignIn,
    isAdmin,
    isAuth,
    remove
)

//list categories
router.get('/categories', list)

router.param('categoryId', categoryById)
router.param('userId', userById)

module.exports = router