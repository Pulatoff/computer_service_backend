const AppError = require('../utility/appError')
const catchAsync = require('../utility/catchAsync')
const Product = require('../models/productsModel')
const ProductDetails = require('../models/productDetailsModel')
const response = require('../utility/response')
const multer = require('multer')
const crypto = require('crypto')

const storage = multer.memoryStorage()

exports.upload = multer({
    storage,
}).array('imageFiles', 4)

exports.addProduct = catchAsync(async (req, res, next) => {
    const { name, price, description, colors, condition, images, specifications, category_id } = req.body
    const file = req.files[0]
    const decodeImage = new Buffer(file.buffer, 'binary').toString('base64')
    const image_main = await crypto.randomUUID().toString('binary')

    const product = await Product.create({ name, image_main, categoryId: category_id, image_binary: decodeImage })

    await ProductDetails.create({
        price,
        description,
        colors,
        condition,
        images: ['nmadir'],
        specifications,
        productId: product.id,
    })

    response(res, '', 200, `You are successfully created product by id: ${product.id}`)
})

exports.getAllProducts = catchAsync(async (req, res, next) => {
    const products = await Product.findAll({
        include: [{ model: ProductDetails }],
        attributes: { exclude: ['image_binary'] },
    })
    response(res, { products }, 200, 'You are successfully get product')
})

exports.getOneProduct = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const product = await Product.findByPk(id, {
        include: [{ model: ProductDetails }],
        attributes: { exclude: ['image_binary'] },
    })
    response(res, { product }, 200, 'You are successfully get product')
})

exports.getImage = catchAsync(async (req, res, next) => {})
