const Spiner = require('../models/spinerModel')
const Image = require('../models/imageModel')
const multer = require('multer')
const crypto = require('crypto')

const CatchAsync = require('../utility/catchAsync')
const response = require('../utility/response')

const storage = multer.memoryStorage()
exports.upload = multer({ storage }).fields([
    { name: 'image', maxCount: 1 },
    { name: 'backgroundImage', maxCount: 1 },
])

exports.addSpiner = CatchAsync(async (req, res, next) => {
    const { firstText, secondText, thirdText } = req.body
    console.log(req.files, req.body)
    const filenameBackground = crypto.randomUUID() + '.' + req.files.backgroundImage[0].mimetype.split('/')[1]
    const filename = crypto.randomUUID() + '.' + req.files.image[0].mimetype.split('/')[1]

    await Image.create({ image: req.files.backgroundImage[0].buffer, image_name: filenameBackground })
    await Image.create({ image: req.files.image[0].buffer, image_name: filename })
    const image = `${req.protocol}://${req.get('host')}/api/v1/products/images/${filename}`
    const backgroundImage = `${req.protocol}://${req.get('host')}/api/v1/products/images/${filenameBackground}`
    await Spiner.create({ firstText, secondText, thirdText, image, backgroundImage })
    response(res, {}, 201, 'You are successfully add data')
})

exports.getSpiner = CatchAsync(async (req, res, next) => {
    const spiner = await Spiner.findOne({ order: [['id', 'DESC']] })
    response(res, { spiner }, 200, 'You are successfully get data')
})
