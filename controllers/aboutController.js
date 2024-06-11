const About = require('../models/aboutModel')

const Image = require('../models/imageModel')
const multer = require('multer')
const crypto = require('crypto')
const catchAsync = require('../utility/catchAsync')
const response = require('../utility/response')
const AboutRu = require('../models/aboutRuModel')

const storage = multer.memoryStorage()

exports.upload = multer({ storage }).fields([{ maxCount: 3, name: 'images' }])

exports.addAbout = catchAsync(async (req, res, next) => {
    const text = req.body.text
    const images = req.files.images
    const imageUrls = []
    for (let index = 0; index < images.length; index++) {
        const image = images[index]
        const filename = crypto.randomUUID() + '.' + image.mimetype.split('/')[1]
        await Image.create({ image: image.buffer, image_name: filename })
        imageUrls.push(`${req.protocol}://${req.get('host')}/api/v1/products/images/${filename}`)
    }
    await About.create({ text, images: imageUrls })
    response(res, {}, 201, 'You are successfully add data')
})

exports.getAbout = catchAsync(async (req, res, next) => {
    const about = await About.findOne({ order: [['id', 'DESC']], include: AboutRu })
    response(res, { about }, 201, 'You are successfully get data')
})

exports.addAboutRu = catchAsync(async (req, res, next) => {
    const text = req.body.text
    const aboutId = req.body.aboutId
    await AboutRu.create({ text, aboutId })

    response(res, {}, 201, 'You are successfully add data')
})
