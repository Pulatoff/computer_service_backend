const User = require('../models/userModel')
// utils
const catchAsync = require('../utility/catchAsync')
const response = require('../utility/response')
//

const getAllUsers = catchAsync(async (req, res) => {
    const users = await User.findAll({ attributes: { exclude: ['password'] } })
    response(res, { data: users }, 200, `You are successfullt get ${users.length}`, users.length)
})

const add = catchAsync(async (req, res) => {
    const user = await User.create(req.body)
    res.status(200).json({ data: user })
})

const delete1 = catchAsync(async (req, res) => {
    await User.destroy({ where: { id: req.params.id } })
    res.status(200).json({ data: 'success' })
})
const getOne = catchAsync(async (req, res) => {
    const user = await User.findOne({ where: { id: req.params.id }, include: { model: Location } })
    res.status(200).json({ data: user })
})
const update = catchAsync(async (req, res) => {
    const user = await User.findOne({ where: { id: req.params.id } })

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

module.exports = {
    add,
    getAllUsers,
    delete1,
    getOne,
    update,
}
