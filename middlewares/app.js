const express = require('express')
const app = express()
const morgan = require('morgan')
const errorHandler = require('../controllers/errorHandler')
const { urlencoded } = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const review = require('../routes/reviewRouter')
const categoryRouter = require('../routes/categoryRouter')
const brandsModel = require('../routes/brandRoutes')
const auth = require('../routes/userRouter')
const details = require('../routes/detailsRoute')
const product = require('../routes/productRoute')
const AppError = require('../utility/appError')

app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'common'))

var corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        callback(null, true)
    },
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true)
    next()
})

// for fetching request body
app.use(express.json({ limit: '1000kb' }))
app.use(urlencoded({ limit: '1000kb' }))
app.use(express.static('public'))
// routes
app.use('/api/v1/users', auth)
app.use('/api/v1/product', product)
app.use('/api/v1/details', details)
app.use('/api/v1/brands', brandsModel)
app.use('/api/v1/categories', categoryRouter)
app.use('/api/v1/reviews', review)

app.all('*', (req, res, next) => {
    next(new AppError('url not found', 404))
})

app.use(errorHandler)

module.exports = app

// click
// payme
// apelsin
