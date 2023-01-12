// models
const Category = require('../models/categoriesModel')
// utils
const AppError = require('../utility/appError')
const catchAsync = require('../utility/catchAsync')
const response = require('../utility/response')

exprots.getAllCategories = catchAsync(async (req, res) => {
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

const delete1 = catchAsync(async (req, res) => {
    await Category.destroy({ where: { id: req.params.id } })
    res.status(200).json({ data: 'success' })
})
const getOne = catchAsync(async (req, res) => {
    const loc = await Category.findOne({
        where: { id: req.params.id },
        include: [
            {
                model: db.categoryLittles,
                as: 'categoryLittles',
            },
        ],
    })
    res.status(200).json({
        data: loc,
    })
})
const update = async (req, res) => {
    const loc = await Category.findOne({ where: { id: req.params.id } })

    let name = req.body.name || loc.name
    let photo = req.body.photo || loc.photo

    const newLocation = await Category.update({ photo, name }, { where: { id: req.params.id } })

    console.log(newLocation)
    const newCategory = await Category.findOne({
        where: { id: req.params.id },
    })
    res.status(200).json({
        data: newCategory,
    })
}
