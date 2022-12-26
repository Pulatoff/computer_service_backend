// models
const User = require('../models/userModel')
// utils
const catchAsync = require('../utility/catchAsync')
const response = require('../utility/response')

exports.getAllUsers = catchAsync(async (req, res) => {
    const users = await User.findAll({ attributes: { exclude: ['password'] } })
    response(res, { data: users }, 200, `You are successfullt get ${users.length}`, users.length)
})

exports.createUser = catchAsync(async (req, res, next) => {
    const { username, email, password, role } = req.body
    const user = await User.create({ username, email, password, role })
    response(res, { user }, 201, `You created new consumer by id: ${user.id}`)
})

exports.deleteUser = catchAsync(async (req, res) => {
    const id = req.params.id
    await User.destroy({ where: { id } })
    res.status(200).json({ data: 'success' })
})

exports.getOneUser = catchAsync(async (req, res) => {
    const id = req.params.id
    const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } })
    response(res, { user }, 200, 'You successfully get user')
})

exports.updateUser = catchAsync(async (req, res) => {
    const id = req.params.id
    const user = await User.findOne({ where: { id } })

    user.first_name = req.body.first_name || user.first_name
    user.last_name = req.body.last_name || user.last_name
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email
    user.phone = req.body.phone || user.phone
    user.password = req.body.password || user.password
    user.locationId = req.body.locationId || user.locationId

    const newUser = await user.save()

    res.status(200).json({ data: newUser })
})
