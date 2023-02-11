const AppError = require('../utility/appError')
const catchAsync = require('../utility/catchAsync')
const Product = require('../models/productsModel')
const ProductDetails = require('../models/productDetailsModel')
const Images = require('../models/ImagesModel')
const response = require('../utility/response')
const multer = require('multer')
const crypto = require('crypto')
const fs = require('fs')

const storage = multer.memoryStorage()

exports.upload = multer({
    storage,
}).array('imageFiles', 4)

exports.addProduct = catchAsync(async (req, res, next) => {
    const { name, price, description, colors, condition, images, specifications, category_id } = req.body

    const image_main = await crypto.randomUUID().toString('binary')

    const decodeImage = new Buffer(req.files[0].buffer, 'binary').toString('base64')
    const images_name = []
    for (let i = 1; i < req.files.length - 1; i++) {
        const decodedImage = new Buffer(req.files[i].buffer, 'binary').toString('base64')
        const image = await crypto.randomUUID().toString('binary')
        await Images.create({ image_name: image, image_binary: decodedImage })
        images_name.push(image)
    }

    const product = await Product.create({ name, image_main, categoryId: category_id })
    await Images.create({ image_name: image_main, image_binary: decodeImage })

    await ProductDetails.create({
        price,
        description,
        colors,
        condition,
        images: images_name,
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

exports.getImage = catchAsync(async (req, res, next) => {
    const uuid = req.params.uuid
    const image = await Images.findOne({ where: { id: 1 } })

    const blobToImage = (blob) => {
        console.log(blob)
        return new Promise((resolve) => {
            const url = URL.createObjectURL(blob)
            let img = new Image()
            img.onload = () => {
                URL.revokeObjectURL(url)
                resolve(img)
            }
            img.src = url
        })
    }
    const imageFile = blobToImage(image.image_binary)

    res.end(imageFile)
})
