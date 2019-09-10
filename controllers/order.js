const { Order, CartItem } = require('../models/orders');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
	//console.log(req.body)
	req.body.order.user = req.profile;
	const newOrder = new Order(req.body.order);
	newOrder.save((err, data) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler(err),
			});
		}
		res.json(data);
	});
};

exports.listOrders = (req, res) => {
	Order.find()
		.populate('user', '_id name address')
		.sort('-created')
		.exec((err, data) => {
			if (err) {
				return res.status(400).json({
					error: errorHandler(err),
				});
			}
			res.json(data);
		});
};

exports.getStatusValues = (req, res) => {
	res.json(Order.schema.path('status').enumValues);
};

exports.orderById = (req, res, next, id) => {
	Order.findById(id)
		.populate('products.product', 'name price')
		.exec((err, order) => {
			if (err || !order) {
				res.status(400).json({
					error: errorHandler(err),
				});
			}
			req.order = order;
			next();
		});
};

exports.updateOrderStatus = (req, res) => {
	Order.update({ _id: req.body.orderId }, { $set: { status: req.body.status } }, (err, order) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler(err),
			});
		}
		res.json(order);
	});
};
