const Service = require('../models/servicesModel')
const catchAsync = require('../utility/catchAsync')
const multer = require('multer')
const response = require('../utility/response')
const crypto = require('crypto')
const Image = require('../models/imageModel')
const storage = multer.memoryStorage()

exports.upload = multer({
    storage,
}).single('image')

exports.addService = catchAsync(async (req, res, next) => {
    const { name, features, resolve_problems, phone, description } = req.body
    const filename = crypto.randomUUID() + '.' + req.file.mimetype.split('/')[1]
    await Image.create({ image_name: filename, image: req.file.buffer })

    const image_url = process.env.HOST_URL + '/api/v1/products/images/' + filename

    const service = await Service.create({
        name,
        image_url,
        image: filename,
        features: JSON.parse(features),
        resolve_problems: JSON.parse(resolve_problems),
        phone,
        description,
    })

    response(res, { service }, 201, 'You successfully create service')
})

exports.getServices = catchAsync(async (req, res, next) => {
    const services = await Service.findAll({ limit: 6 })
    response(res, { services }, 200, 'You are successfully get services')
})

exports.getOneService = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const service = await Service.findByPk(id)
    response(res, { service }, 200, 'You are successfully get service')
})

exports.updateService = catchAsync(async (req, res, next) => {
    const { name, features, resolve_problems } = req.body
    const id = req.params.id
    const service = await Service.findByPk(id)
    service.name = name || service.name
    service.features = features || service.features
    service.resolve_problems = resolve_problems || service.resolve_problems

    await service.save()
    response(res, { service }, 203, 'You are successfully update service')
})

exports.deleteService = catchAsync(async (req, res, next) => {
    const id = req.params.id
    await Service.destroy({ where: { id } })
    response(res, '', 206, `You are successfully delete service by id ${id}`)
})
