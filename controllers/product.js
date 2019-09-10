//for image
const formidable = require('formidable');

const _ = require('lodash');
const Product = require('../models/products');
const { errorHandler } = require('../helpers/dbErrorHandler');
const fs = require('fs');

exports.create = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields, files) => {
		if (err) {
			return res.status(400).json({
				error: 'Image could not be uploaded',
			});
		}
		let newProduct = new Product(fields);

		//validation for fields
		const { name, description, price, category, shipping, quantity } = fields;
		if (!name || !description || !price || !category || !shipping || !quantity) {
			return res.status(400).json({
				error: 'All fields are required',
			});
		}

		//to save photo
		if (files.photo) {
			if (files.photo.size > 100000) {
				return res.status(400).json({
					error: 'Image size should be less than 1 MB',
				});
			}
			newProduct.photo.data = fs.readFileSync(files.photo.path);
			newProduct.photo.contentType = files.photo.type;
		}

		newProduct.save((err, data) => {
			if (err || !data) {
				return res.status(400).json({
					error: errorHandler(err),
				});
			}
			res.json(data);
		});
	});
};

//to get the product details
exports.productById = (req, res, next, id) => {
	Product.findById(id)
		.populate('category')
		.exec((err, product) => {
			if (err || !product) {
				return res.status(404).json({
					error: 'Product not found',
				});
			}
			req.product = product;
			next();
		});
};

//read the product
exports.read = (req, res) => {
	req.product.photo = undefined;
	return res.json(req.product);
};

//delete the product
exports.remove = (req, res) => {
	let product = req.product;
	product.remove(err => {
		if (err) {
			return res.status(400).json({
				error: errorHandler(err),
			});
		}
		res.json({
			message: 'Deleted',
		});
	});
};

//update the product
exports.update = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields, files) => {
		if (err) {
			return res.status(400).json({
				error: 'Image could not be uploaded',
			});
		}

		//validation for fields
		// const { name, description, price, category, shipping, quantity } = fields;

		// if (!name || !description || !price || !category || !shipping || !quantity) {
		// 	return res.status(400).json({
		// 		error: 'All fields are required',
		// 	});
		// }

		let newProduct = req.product;
		newProduct = _.extend(newProduct, fields);

		//to save photo
		if (files.photo) {
			if (files.photo.size > 100000) {
				return res.status(400).json({
					error: 'Image size should be less than 1 MB',
				});
			}
			newProduct.photo.data = fs.readFileSync(files.photo.path);
			newProduct.photo.contentType = files.photo.type;
		}

		newProduct.save((err, data) => {
			if (err || !data) {
				return res.status(400).json({
					error: errorHandler(err),
				});
			}
			res.json(data);
		});
	});
};

//list all the products according to sold and arrival
// query params = ?orderBy=sold&sortBy=sold&limit=4 or ?orderBy=createdAt&sortBy=desc&limit=4
exports.list = (req, res) => {
	let order = req.query.order ? req.query.order : 'asc';
	let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
	let limit = req.query.limit ? parseInt(req.query.limit) : 4;

	Product.find()
		.select('-photo')
		.populate('category')
		.sort([[sortBy, order]])
		.limit(limit)
		.exec((err, products) => {
			if (err) {
				res.status(400).json({
					error: 'Products not found',
				});
			}
			res.json(products);
		});
};

//list related products
exports.listRelated = (req, res) => {
	let limit = req.query.limit ? parseInt(req.query.limit) : 4;

	Product.find({ _id: { $ne: req.product }, category: req.product.category })
		.limit(limit)
		.populate('category', '_id name')
		.exec((err, products) => {
			if (err) {
				res.status(400).json({
					error: 'Products not found',
				});
			}
			res.json(products);
		});
};

//list categories
exports.listCategory = (req, res) => {
	Product.distinct('category', {}, (err, categories) => {
		if (err) {
			res.status(400).json({
				error: 'Products not found',
			});
		}
		res.json(categories);
	});
};

//search products
exports.listBySearch = (req, res) => {
	let order = req.body.order ? req.body.order : 'desc';
	let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
	let limit = req.body.limit ? parseInt(req.body.limit) : 100;
	let skip = parseInt(req.body.skip);
	let findArgs = {};

	// console.log(order, sortBy, limit, skip, req.body.filters);
	// console.log("findArgs", findArgs);

	for (let key in req.body.filters) {
		if (req.body.filters[key].length > 0) {
			if (key === 'price') {
				// gte -  greater than price [0-10]
				// lte - less than
				findArgs[key] = {
					$gte: req.body.filters[key][0],
					$lte: req.body.filters[key][1],
				};
			} else {
				findArgs[key] = req.body.filters[key];
			}
		}
	}

	Product.find(findArgs)
		.select('-photo')
		.populate('category')
		.sort([[sortBy, order]])
		.skip(skip)
		.limit(limit)
		.exec((err, data) => {
			if (err) {
				return res.status(400).json({
					error: 'Products not found',
				});
			}
			res.json({
				size: data.length,
				data,
			});
		});
};

//to send the photo of product
exports.photo = (req, res, next) => {
	if (req.product.photo.data) {
		res.set('Content-Type', req.product.photo.contentType);
		return res.send(req.product.photo.data);
	}
	next();
};

//to send the products based on category and keywords from query parameter
exports.listSearch = (req, res) => {
	const query = {};

	if (req.query.search) {
		query.name = { $regex: req.query.search, $options: 'i' };
		//assign category to query.category
		if (req.query.category && req.query.category != 'All') {
			query.category = req.query.category;
		}
		//find product in database
		Product.find(query, (err, products) => {
			if (err) {
				return res.status(400).json({
					error: errorHandler(err),
				});
			}
			res.json(products);
		}).select('-photo');
	}
};

exports.decreaseQuantity = (req, res, next) => {
	let bulkOps = req.body.order.products.map(product => {
		return {
			updateOne: {
				filter: { _id: product._id },
				update: { $inc: { quantity: -product.count, sold: +product.count } },
			},
		};
	});

	Product.bulkWrite(bulkOps, {}, (err, data) => {
		if (err) {
			return res.status(400).json({
				error: 'Could not update product',
			});
		}
		next();
	});
};
