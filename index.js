const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
require('dotenv').config()

//mongodb connection
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then( () => {
    console.log('Connection has been made, now make fireworks...')
})

//middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(expressValidator())

//define routes
app.use('/api', require('./routes/user-routes'))
app.use('/api', require('./routes/category-routes'))
app.use('/api', require('./routes/product-routes'))

//routes
app.get('/', (req, res) => {
    res.send('Hi')
})


//listen on port 8000
const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})