const express = require('express')
const app = express()
const morgan = require('morgan')
const parser = require('cookie-parser')
const errorHandler = require('../controllers/errorHandler')
app.use(express.json())
app.use(morgan('dev'))
app.use(parser())
const locationRouter = require('../routes/locationRouter')
const userRouter = require('../routes/userRouter')
const review = require('../routes/reviewRouter')
const categoryRouter = require('../routes/categoryRouter')
const brandsModel = require('../routes/brandRoutes')
const auth = require('../routes/authRouter')
const details = require('../routes/detailsRoute')
const product = require('../routes/productRoute')
const AppError = require('../utility/appError')

// routes
app.use('/', auth)
app.use('/api/v1/product', product)
auth.use('/api/v1/details', details)
app.use('/api/v1/brands', brandsModel)
app.use('/api/v1/category', categoryRouter)
app.use('/api/v1/locations', locationRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/reviews', review)

app.all('*', (req, res, next) => {
    next(new AppError('url not found', 404))
})

app.use(errorHandler)

module.exports = app
