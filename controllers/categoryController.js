// models
const Category = require('../models/categoriesModel')
// utils
const AppError = require('../utility/appError')
const catchAsync = require('../utility/catchAsync')
const response = require('../utility/response')

exports.getAllCategories = catchAsync(async (req, res) => {
    const categories = await Category.findAll({ limit: 10 })

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
