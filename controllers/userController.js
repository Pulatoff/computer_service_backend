// models
const User = require('../models/userModel')
const Location = require('../models/locationsModel')
// utils
const catchAsync = require('../utility/catchAsync')
const response = require('../utility/response')
const AppError = require('../utility/appError')

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.findAll({
        attributes: { exclude: ['password'] },
        include: [{ model: Location, attributes: { exclude: ['userId'] } }],
    })
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
    const user = await User.findOne({
        where: { id },
        attributes: { exclude: ['password'] },
        include: [{ model: Location, attributes: { exclude: ['userId'] } }],
    })
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

exports.addLocation = catchAsync(async (req, res, next) => {
    const { city, entrance_number, street, home_number, comment, section_number } = req.body
    const userId = req.user.id
    let resMessage = 'You add your location successfully'
    const location = await Location.findOne({ where: { userId } })

    if (location) {
        location.city = city || location.city
        location.entrance_number = entrance_number || location.entrance_number
        location.comment = comment || location.comment
        location.street = street || location.street
        location.home_number = home_number || location.home_number
        location.section_number = section_number || location.section_number
        await location.save()
        resMessage = 'You update location data successfully'
    } else {
        await Location.create({ city, entrance_number, street, home_number, comment, section_number, userId })
    }

    response(res, '', 201, resMessage)
})
