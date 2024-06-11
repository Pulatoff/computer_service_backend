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
    let { name, features, resolve_problems, phone, description } = req.body
    const filename = crypto.randomUUID() + '.' + req.file.mimetype.split('/')[1]
    await Image.create({ image_name: filename, image: req.file.buffer })

    const image_url = `${req.protocol}://${req.get('host')}/api/v1/products/images/${filename}`

    const service = await Service.create({
        name,
        image_url,
        image: filename,
        features: typeof features === 'string' ? JSON.parse(features) : features,
        resolve_problems: typeof resolve_problems === 'string' ? JSON.parse(resolve_problems) : resolve_problems,
        phone,
        description,
    })

    response(res, { service }, 201, 'You successfully create service')
})

exports.getServices = catchAsync(async (req, res, next) => {
    const services = await Service.findAll()
    response(res, { services }, 200, 'You are successfully get services')
})

exports.getOneService = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const service = await Service.findByPk(id)
    response(res, { service }, 200, 'You are successfully get service')
})

exports.updateService = catchAsync(async (req, res, next) => {
    const { name, features, resolve_problems, description, phone } = req.body
    const id = req.params.id
    const service = await Service.findByPk(id)
    service.name = name || service.name
    service.features = features || service.features
    service.resolve_problems = resolve_problems || service.resolve_problems
    service.description = description || service.description
    service.phone = phone || service.phone

    await service.save()
    response(res, { service }, 203, 'You are successfully update service')
})

exports.deleteService = catchAsync(async (req, res, next) => {
    const id = req.params.id
    await Service.destroy({ where: { id } })
    response(res, '', 206, `You are successfully delete service by id ${id}`)
})

exports.updateImageService = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const file = req.file
    const service = await Service.findByPk(id)
    const image = await Image.findOne({ where: { image_name: service.image } })
    image.image = file.buffer
    await image.save()
    response(res, '', 201, 'You are successfully update image')
})
