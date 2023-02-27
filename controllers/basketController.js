const Basket = require('../models/basketsModel')

const response = require('../utility/response')
const catchAsync = require('../utility/catchAsync')

exports.addToBasket = catchAsync(async (req, res, next) => {
    const { productId } = req.body
})
