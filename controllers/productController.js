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

    response(res, '', 200, 'You are successfully created product')
})

exports.getAllProducts = catchAsync(async (req, res, next) => {
    const products = await Product.findAll({ include: [{ model: ProductDetails }] })
    response(res, { products }, 201, 'You are successfully get product')
})

exports.getOneProduct = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const product = await Product.findByPk(id, { include: [{ model: ProductDetails }] })
    response(res, { product }, 200, 'You are successfully get product')
})
