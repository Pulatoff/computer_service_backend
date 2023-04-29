const Swaper = require('../models/swaperModel')
const multer = require('multer')
const Image = require('../models/imageModel')
const crypto = require('crypto')
const CatchError = require('../utility/catchAsync')
const response = require('../utility/response')
const storage = multer.memoryStorage()

exports.upload = multer({
    storage,
}).single('image')

exports.addSwaper = CatchError(async (req, res, next) => {
    const { title, productId } = req.body
    const image = req.file
    const image_name = crypto.randomUUID().toString('binary') + '.' + image.mimetype.split('/')[1]
    await Swaper.create({
        title,
        productId,
        imageUrl: `${req.protocol}://${req.get('host')}/api/v1/products/images/${image_name}`,
    })

    await Image.create({ image: image.buffer, image_name })
    response(res, {}, 200, 'You are successfully create swaper')
})

exports.getAllSwapers = CatchError(async (req, res, next) => {
    const swapers = await Swaper.findAll({ limit: 10 })
    response(res, { swapers }, 200, 'You are successfully get swapers')
})

exports.deleteSwaper = CatchError(async (req, res, next) => {
    const id = req.params.id
    await Swaper.destroy({ where: { id } })
    response(res, {}, 206, 'You are successfully delete swapers')
})
