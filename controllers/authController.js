const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
// models
const User = require('../models/userModel')
// utils
const AppError = require('../utility/appError')
const catchAsync = require('../utility/catchAsync')
const response = require('../utility/response')

const createToken = ({ id }) => {
    jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

const resUserType = (user) => {
    return {
        id: user.id,
        email: user.email,
        role: user.role,
        username: user.username,
        createdAt: user.createdAt,
    }
}

exports.signUp = catchAsync(async (req, res, next) => {
    const { username, email, password, passwordConfirm } = req.body
    if (!username || !email || !password || !passwordConfirm) {
        next(new AppError('You are need enter all fields', 404))
    }

    if (password !== passwordConfirm) {
        next(new AppError('passwords is not the same', 400))
    }

    const user = await User.create({ username, email, password })

    const token = createToken(user)
    response(res, { user: resUserType(user) }, 201, 'you successfully sign up')
})

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new AppError('Please provide email and password', 400))
    }

    const user = await User.findOne({ where: { email } })

    if (!user) {
        return next(new AppError('User not found', 404))
    }

    const shart = await bcrypt.compare(password, user.password)

    if (!shart) {
        return next(new AppError('Incorrect password', 401))
    }

    const token = createToken(user)

    response(res, { user: resUserType(user) }, 201, 'you successfully sign in')
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
