const Basket = require('../models/basketsModel')
const BasketProduct = require('../models/basketProductModel')

const response = require('../utility/response')
const catchAsync = require('../utility/catchAsync')

exports.addToBasket = catchAsync(async (req, res, next) => {
    const { productId, quantity } = req.body

    const basket = await Basket.findOne({ where: { userId: req.user.id } })
    const basketProduct = await BasketProduct.findOne({
        where: { productId, basketId: basket.id },
    })
    if (basketProduct) {
        basketProduct.quantity += quantity
        await basketProduct.save()
    } else {
        await BasketProduct.create({
            productId,
            quantity,
            basketId: basket.id,
        })
    }

    response(res, '', 201, 'You are successfully saved product to basket')
})
