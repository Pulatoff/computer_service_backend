const express = require('express')
const app = express()
const morgan = require('morgan')
const errorHandler = require('../controllers/errorHandler')
const { urlencoded } = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const categoryRouter = require('../routes/categoryRouter')
const auth = require('../routes/userRouter')
const product = require('../routes/productRoute')
const serviceRouter = require('../routes/serviceRouter')
const configurationRouter = require('../routes/configurationRoute')
const OrderRouter = require('../routes/orderRoutes')
const SwaperRouter = require('../routes/swaperRouter')
const basketRouter = require('../routes/basketRouter')
const paymentRouter = require('../routes/paymentRouter')
const spinerRouter = require('../routes/spinerRouter')
const aboutRouter = require('../routes/aboutRouter')
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
app.use(urlencoded({ limit: '1000kb', extended: true }))
app.use(express.static('public'))

// routes
app.use('/api/v1/users', auth)
app.use('/api/v1/products', product)
app.use('/api/v1/categories', categoryRouter)
app.use('/api/v1/services', serviceRouter)
app.use('/api/v1/baskets', basketRouter)
app.use('/api/v1/payment', paymentRouter)
app.use('/api/v1/configurations', configurationRouter)
app.use('/api/v1/orders', OrderRouter)
app.use('/api/v1/swapers', SwaperRouter)
app.use('/api/v1/spiners', spinerRouter)
app.use('/api/v1/about', aboutRouter)

app.all('*', (req, res, next) => {
    next(new AppError('url not found', 404))
})

app.use(errorHandler)

module.exports = app

// click
// payme
// apelsin
