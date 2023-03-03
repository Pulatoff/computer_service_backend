// models
const Category = require('../models/categoriesModel')
const Product = require('../models/productsModel')
const ProductDetails = require('../models/productDetailsModel')
const Review = require('../models/reviewsModel')
const User = require('../models/userModel')
const sequelize = require('sequelize')
const { Op } = require('sequelize')
// utils
const AppError = require('../utility/appError')
const catchAsync = require('../utility/catchAsync')
const response = require('../utility/response')

exports.getAllCategories = catchAsync(async (req, res, next) => {
    const categories = await Category.findAll({
        limit: 10,

        include: [
            {
                model: Product,
                limit: 10,
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
    })
    response(res, { categories }, 200, 'you are get categories')
})

exports.addCategory = catchAsync(async (req, res, next) => {
    const { name } = req.body
    if (!name) {
        next(new AppError('You need enter all fields'))
    }
    await Category.create({ name })
    response(res, '', 201, `You create category by name: ${name}`)
})

exports.getOneCategory = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const category = await Category.findByPk(id, {
        include: [{ model: Product, limit: 6, attributes: { exclude: ['image_main', 'categoryId'] } }],
    })
    response(res, { category }, 200, `You successfully get category data by id ${id}`)
})

exports.updateCategory = catchAsync(async (req, res, next) => {
    const name = req.body.name
    const id = req.params.id
    const category = await Category.findByPk(id)
    category.name = name || category.name
    await category.save()
    response(res, '', 203, 'You are successfully update category')
})

exports.deleteCategory = catchAsync(async (req, res, next) => {
    const id = req.params.id
    await Category.destroy({ where: { id } })
    response(res, '', 206, 'You are successfully delete category')
})
