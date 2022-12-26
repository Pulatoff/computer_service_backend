// models
const User = require('../models/userModel')
// utils
const catchAsync = require('../utility/catchAsync')
const response = require('../utility/response')

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.findAll({ attributes: { exclude: ['password'] } })
    response(res, { data: users }, 200, `You are successfully get ${users.length}`, users.length)
})

exports.createUser = catchAsync(async (req, res, next) => {
    const { username, email, password, role } = req.body
    const user = await User.create({ username, email, password, role })
    response(res, { user }, 201, `You created new consumer by id: ${user.id}`)
})

exports.deleteUser = catchAsync(async (req, res, next) => {
    const id = req.params.id
    await User.destroy({ where: { id } })
    response(res, '', 206, 'user successfully deleted')
})

exports.getOneUser = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } })
    response(res, { user }, 200, 'You successfully get user')
})

exports.updateUser = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const { username, activ, role, email } = req.body
    const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } })

    user.username = username || user.username
    user.email = email || user.email
    user.activ = activ || user.activ
    user.role = role || user.role
    await user.save()

    response(res, { user }, 200, 'you successfully update user')
})
