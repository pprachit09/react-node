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