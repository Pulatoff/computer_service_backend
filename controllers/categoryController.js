// models
const Category = require('../models/categoriesModel')
// utils
const AppError = require('../utility/appError')
const catchAsync = require('../utility/catchAsync')
const response = require('../utility/response')

exports.getAllCategories = catchAsync(async (req, res, next) => {
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

exports.getOneCategory = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const category = await Category.findByPk(id)
    response(res, { category }, 200, `You successfully get category data by id ${id}`)
})

exports.updateCategory = catchAsync(async (req, res, next) => {
    const name = req.body.name
    const id = req.params.id
    const category = await Category.findByPk(id)
    category.name = name || category.name

    response(res, '', 203, 'You are successfully update category')
})

exports.deleteCategory = catchAsync(async (req, res, next) => {
    const id = req.params.id
    await Category.destroy({ where: { id } })
    response(res, '', 206, 'You are successfully delete category')
})
