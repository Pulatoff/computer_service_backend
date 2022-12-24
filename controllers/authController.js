const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const JwtSecret = process.env.JWT_SECRET
// models
const User = require('../models/userModel')
// utils
const AppError = require('../utility/appError')
const catchAsync = require('../utility/catchAsync')

exports.signUp = catchAsync(async (req, res, next) => {
    const { username, email, password, passwordConfirm } = req.body

    const user = await User.create({ username, email, password })
    if (!user) {
        next(new AppError('User not created', 400))
    }
    const id = user.id
    const token = jwt.sign({ id }, JwtSecret, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
    res.status(200).json({
        token: token,
    })
})

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body
    if ((!email && !username && !phone) || !password) {
        return next(new AppError('Please provide email and password', 400))
    }
    const user = await User.findOne({
        attributes: ['id', 'email', 'password', 'username', 'role'],
        where: {
            [db.Op.or]: [{ email }, { username }, { phone }],
        },
    })
    if (!user) {
        return next(new AppError('User not found', 404))
    }
    const shart = await bcrypt.compare(password, user.password)
    if (user.role === 'admin') {
    }
    if (!shart) {
        return next(new AppError('Incorrect password', 401))
    }
    const id = user.id
    const token = jwt.sign({ id }, JwtSecret, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
    res.status(200).json({
        token,
    })
})

exports.protect = catchAsync(async (req, res, next) => {
    console.log(req.headers.authorization)
    let token = req.headers.authorization
    if (token.split(' ')[0] === 'Bearer' && token.split(' ')[1]) token = req.headers.authorization.split(' ')[1]
    else return next(new AppError('Token not found', 401))
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)

    const time = new Date().getTime()
    if (!decoded || !(decoded.exp <= time)) {
        return next(new AppError('Token is not valid', 401))
    }
    const user = await User.findOne({
        attributes: ['id', 'email', 'password', 'username', 'role'],
        where: {
            id: decoded.id,
        },
    })
    if (!user) {
        return new AppError('User not found', 404)
    }
    req.user = user
})

exports.logout = catchAsync(async (req, res, next) => {
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    })
    res.status(200).json({
        status: 'success',
    })
})
