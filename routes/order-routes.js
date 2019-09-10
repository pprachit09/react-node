const express = require('express');
const router = express.Router();

const { requiredSignIn, isAuth, isAdmin, userById, addOrderToPurchaseHistory } = require('../controllers/user');
const { create, listOrders, getStatusValues, orderById, updateOrderStatus } = require('../controllers/order');
const { decreaseQuantity } = require('../controllers/product');

router.post('/order/create/:userId', requiredSignIn, isAuth, addOrderToPurchaseHistory, decreaseQuantity, create);
router.get('/order/list/:userId', requiredSignIn, isAuth, isAdmin, listOrders);
router.get('/order/status-values/:userId', requiredSignIn, isAuth, isAdmin, getStatusValues);
router.put('/order/:orderId/status/:userId', requiredSignIn, isAuth, isAdmin, updateOrderStatus);

router.param('userId', userById);
router.param('orderId', orderById);

module.exports = router;
