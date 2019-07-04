const Category = require('../models/categories')
const { errorHandler } =require('../helpers/dbErrorHandler')

exports.create = (req, res) => {
    const newCategory = new Category(req.body)
    newCategory.save((err, data) => {
        if(err || !data) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({ data })
    })
}

//get cateogry by ID
exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec( (err, category) => {
        if(err || !category){
            return res.status(400).json({
                error: "Category does not exist"
            })
        }
        req.category = category
        next()
    })
}

//read category
exports.read = (req, res) => {
    return res.json(req.category)
}

//update category
exports.update = (req, res) => {
    const newCategory = req.category
    newCategory.name = req.body.name
    newCategory.save( (err, category) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(category)
    })
}

//remove category
exports.remove = (req, res) => {
    const newCategory = req.category
    newCategory.name = req.body.name
    newCategory.remove( (err, category) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: "category deleted"
        })
    })
}

//list all categories
exports.list = (req, res) => {
    Category.find().exec((err, categories) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(categories)
    })
}