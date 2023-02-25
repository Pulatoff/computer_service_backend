const Service = require('../models/servicesModel')
const s3Client = require('../configs/s3Client')
const catchAsync = require('../utility/catchAsync')
const multer = require('multer')
const response = require('../utility/response')
const crypto = require('crypto')
const { PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

const storage = multer.memoryStorage()

exports.upload = multer({
    storage,
}).single('image')

exports.addService = catchAsync(async (req, res, next) => {
    const { name, features, resolve_problems } = req.body
    const filename = crypto.randomUUID()

    await s3Client.send(
        new PutObjectCommand({
            Key: filename,
            Bucket: process.env.DO_SPACE_BUCKET,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        })
    )

    const image_url = await getSignedUrl(
        s3Client,
        new GetObjectCommand({ Key: filename, Bucket: process.env.DO_SPACE_BUCKET }),
        { expiresIn: 3600 * 24 }
    )
    const service = await Service.create({
        name,
        image_url,
        image: filename,
        features: JSON.parse(features),
        resolve_problems: JSON.parse(resolve_problems),
    })

    response(res, { service }, 201, 'You successfully create service')
})

exports.getServices = catchAsync(async (req, res, next) => {
    const services = await Service.findAll({ limit: 6 })
    response(res, { services }, 200, 'You are successfully get services')
})
