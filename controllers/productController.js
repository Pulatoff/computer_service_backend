const AppError = require('../utility/appError')
const catchAsync = require('../utility/catchAsync')
const Product = require('../models/productsModel')
const ProductDetails = require('../models/productDetailsModel')
const response = require('../utility/response')
const multer = require('multer')
const crypto = require('crypto')
const { Op } = require('sequelize')
const stream = require('stream')
const Category = require('../models/categoriesModel')
const Review = require('../models/reviewsModel')
const User = require('../models/userModel')
const Image = require('../models/imageModel')
const sequelize = require('../configs/db')

const storage = multer.memoryStorage()

exports.upload = multer({
    storage,
}).array('imageFiles', 4)

exports.addProduct = catchAsync(async (req, res, next) => {
    const { name, price, description, colors, condition, specifications, category_id } = req.body

    const image_main = crypto.randomUUID().toString('binary') + '.' + req.files[0].mimetype.split('/')[1]
    await Image.create({ image_name: image_main, image: req.files[0].buffer })
    const file_url = process.env.HOST_URL + '/api/v1/products/images/' + image_main
    const images_name = []
    const image_urls = []
    for (let i = 1; i < req.files.length; i++) {
        const image = crypto.randomUUID().toString('binary') + '.' + req.files[0].mimetype.split('/')[i]
        await Image.create({ image_name: image, image: req.files[i].buffer })
        const file_url = process.env.HOST_URL + '/api/v1/products/images/' + image

        image_urls.push(file_url)
        images_name.push(image)
    }

    const product = await Product.create({ image_url: file_url, name, image_main, categoryId: category_id })

    await ProductDetails.create({
        price,
        description,
        colors,
        condition,
        images: images_name,
        specifications,
        productId: product.id,
        image_urls,
    })

    response(res, '', 200, `You are successfully created product by id: ${product.id}`)
})

exports.getAllProducts = catchAsync(async (req, res, next) => {
    const products = await Product.findAll({
        include: [
            { model: ProductDetails, attributes: { exclude: ['images', 'productId'] } },
            { model: Category, include: [{ model: Product, attributes: { exclude: ['image_main', 'categoryId'] } }] },
            {
                model: Review,
                attributes: { exclude: ['userId', 'productId'] },
                include: [{ model: User, attributes: ['username'] }],
            },
        ],

        attributes: {
            exclude: ['image_main', 'categoryId'],
        },
    })
    response(res, { products }, 200, 'You are successfully get product')
})

exports.getOneProduct = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const product = await Product.findByPk(id, {
        include: [
            { model: ProductDetails, attributes: { exclude: ['images', 'productId'] } },
            {
                model: Category,
                include: [
                    {
                        model: Product,
                        limit: 6,
                        attributes: { exclude: ['image_main', 'categoryId'] },
                        include: [
                            { model: ProductDetails, attributes: { exclude: ['images', 'productId'] } },
                            {
                                model: Review,
                                attributes: { exclude: ['userId', 'productId'] },
                                include: [{ model: User, attributes: ['username'] }],
                            },
                        ],
                    },
                ],
            },
            {
                model: Review,

                attributes: { exclude: ['userId', 'productId'] },
                include: [{ model: User, attributes: ['username'] }],
            },
        ],

        attributes: {
            exclude: ['image_main', 'categoryId'],
        },
    })
    product.views = product.views + 1
    await product.save()
    const products = await Review.findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('reviews.rating')), 'count']],
        group: ['id'],
    })
    // Results will be an empty array and metadata will contain the number of affected rows.
    console.log(products)
    response(res, { product, products }, 200, 'You are successfully get product')
})

exports.updateProduct = catchAsync(async (req, res, next) => {
    let { name, price, description, colors, condition, specifications } = req.body
    const id = req.params.id
    const product = await Product.findByPk(id, { include: ProductDetails })
    const product_detail = await ProductDetails.findOne({ where: { productId: product.id } })
    if (!product) next(new AppError('Product not found', 404))
    product.name = name || product.name
    product_detail.price = price || product_detail.price
    product_detail.description = description || product_detail.description
    product_detail.colors = colors || product_detail.colors
    product_detail.condition = condition || product_detail.condition
    product_detail.specifications = specifications || product_detail.specifications
    await product.save()
    await product_detail.save()
    response(res, '', 203, 'You are successfully update product')
})

exports.deleteProduct = catchAsync(async (req, res, next) => {
    const id = req.params.id
    await Product.destroy({ where: { id } })
    response(res, '', 206, 'You are successfully delete product')
})

exports.searchProducts = catchAsync(async (req, res, next) => {
    const { search, minPrice, maxPrice, sort } = req.query
    const order = JSON.stringify(sort)
    let results = []
    const products = await Product.findAll({
        include: [
            { model: Category },
            {
                model: ProductDetails,
                attributes: {
                    exclude: ['images', 'productId'],
                },
            },
            { model: Review },
        ],
        where: {
            name: { [Op.like]: '%' + search + '%' },
        },
        attributes: {
            exclude: ['image_main', 'categoryId'],
            include: [],
        },
        group: ['products.id', 'category.id', 'product_detail.id', 'reviews.id'],
    })

    const category = await Category.findAll({
        where: {
            name: { [Op.like]: '%' + search + '%' },
        },
        include: [{ model: Product, include: [{ model: ProductDetails }, { model: Review }] }],
    })

    products.map((val) => {
        results.push(val)
    })

    category.map((val) => {
        val.products.map((val) => {
            results.push(val)
        })
    })

    const maxPricex = Math.max.apply(
        Math,
        results.map(function (o) {
            return o.product_detail?.price
        })
    )

    if (sort === 'price' || sort === '-price') {
        if (sort === 'price') {
            results.sort((b, a) => {
                return a.product_detail.price - b.product_detail.price
            })
        } else {
            results.sort((a, b) => {
                return a.product_detail.price - b.product_detail.price
            })
        }
    } else if (sort === 'createdAt' || sort === '-createdAt') {
        if (sort === 'createdAt') {
            results.sort((b, a) => {
                return a.createdAt - b.createdAt
            })
        } else {
            results.sort((a, b) => {
                return a.createdAt - b.createdAt
            })
        }
    } else if (sort === 'avgRating' || sort === '-avgRating') {
        if (sort === 'avgRating') {
            results.sort((b, a) => {
                return a.avg_rating - b.avg_rating
            })
        } else {
            results.sort((a, b) => {
                return a.avg_rating - b.avg_rating
            })
        }
    }

    if (minPrice && maxPrice) {
        results = results.filter((val) => {
            if (+minPrice <= +val.product_detail.price && +maxPrice >= +val.product_detail.price) {
                return val
            }
        })
    }
    results = results.filter((value, index, self) => index === self.findIndex((t) => t.id === value.id))
    response(res, { results, options: { maxPrice: maxPricex } }, 200, 'You are successfully delete product')
})

exports.addReview = catchAsync(async (req, res, next) => {
    const { rating, body } = req.body
    const productId = req.params.productId
    const product = await Product.findByPk(productId, { include: Review })
    product.avg_rating =
        product.reviews.length !== 0 ? (product.avg_rating + rating) / (product.reviews.length + 1) : rating
    await Review.create({ rating, body, userId: req.user.id, productId, product_id: productId })
    await product.save()

    response(res, '', 200, 'You are successfully review product')
})

exports.sendImage = catchAsync(async (req, res, next) => {
    const image_name = req.params.image_name
    const imageOption = await Image.findOne({ where: { image_name } })

    const readStream = new stream.PassThrough()
    readStream.end(imageOption.image)

    res.set('Content-disposition', 'attachment; filename=' + imageOption.image_name)
    res.set('Content-Type', 'image/jpeg')

    readStream.pipe(res)
})
