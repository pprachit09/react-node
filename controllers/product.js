//for image
const formidable = require('formidable')

const _ = require('lodash')
const Product = require('../models/products')
const { errorHandler } =require('../helpers/dbErrorHandler')
const fs = require('fs')

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse( req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }
        let newProduct = new Product(fields)

        //validation for fields
        const { name, description, price, category, shipping, quantity } = fields

        if(!name || !description || !price || !category || !shipping || !quantity){
            return res.status(400).json({
                error: 'All fields are required'
            })
        }

        //to save photo
        if(files.photo){
            if(files.photo.size > 100000){
                return res.status(400).json({
                    error: 'Image size should be less than 1 MB'
                })
            }
            newProduct.photo.data = fs.readFileSync(files.photo.path)
            newProduct.photo.contentType = files.photo.type 
        }

        newProduct.save( (err, data) => {
            if(err || !data){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(data)
        })
    })
}