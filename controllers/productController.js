const AppError = require('../utility/appError')
const catchAsync = require('../utility/catchAsync')
const Product = require('../models/productsModel')
const ProductDetails = require('../models/productDetailsModel')
const response = require('../utility/response')

exports.addProduct = catchAsync(async (req, res, next) => {
    const { image_main, name, price, description, colors, condition, images, specifications, category_id } = req.body
    const product = await Product.create({ name, image_main, categoryId: category_id })
    await ProductDetails.create({
        price,
        description,
        colors,
        condition,
        images,
        specifications,
        productId: product.id,
    })

    response(res, '', 201, 'You are successfully created product')
})
