const Configuration = require('../models/configurationModel')
const ConfigurationRu = require('../models/configurationRuModel')
const Product = require('../models/productsModel')
const ProductDetail = require('../models/productDetailsModel')
// utils
const catchAsync = require('../utility/catchAsync')
const response = require('../utility/response')

exports.addToConfiguration = catchAsync(async (req, res, next) => {
    const { type } = req.body
    const configuration = await Configuration.create({ type })
    response(res, { configuration }, 201, 'You are successfully create config type')
})

exports.getAllConfiguration = catchAsync(async (req, res, next) => {
    const configurations = await Configuration.findAll({
        include: [{ model: Product, include: [{ model: ProductDetail }] }, { model: ConfigurationRu }],
    })
    response(res, { configurations }, 200, 'You are successfully get configurations')
})

exports.getOneConfiguration = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const configuration = await Configuration.findByPk(id, {
        include: [{ model: Product, include: [{ model: ProductDetail }] }],
    })
    response(res, { configuration }, 200, 'You are successfully get configuration')
})

exports.updateConfiguration = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const type = req.body.type
    const configuration = await Configuration.findByPk(id)
    configuration.type = type || configuration.type
    await configuration.save()
    response(res, { configuration }, 203, 'You are successfully update configuration')
})

exports.deleteConfiguration = catchAsync(async (req, res, next) => {
    const id = req.params.id
    await Configuration.destroy({ where: { id } })
    response(res, {}, 206, 'You are successfully delete configuration')
})

exports.addToConfigurationRu = catchAsync(async (req, res, next) => {
    const type = req.body.type
    const configurationId = req.body.configurationId
    await ConfigurationRu.create({ type, configurationId })
    response(res, {}, 201, 'You are successfully create config type')
})
