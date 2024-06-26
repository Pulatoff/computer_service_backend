const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
// models
const User = require('../models/userModel')
const Location = require('../models/locationsModel')
// utils
const AppError = require('../utility/appError')
const catchAsync = require('../utility/catchAsync')
const response = require('../utility/response')
const Basket = require('../models/basketsModel')
const Product = require('../models/productsModel')
const Favorite = require('../models/favoriteModel')
const ProductDetail = require('../models/productDetailsModel')
const sendGrid = require('../utility/sendGrid')

const createToken = async ({ id }) => {
    return await jwt.sign({ id }, 'starnewtech', {
        expiresIn: '10d',
    })
}

const sendCookie = (res, token) => {
    res.cookie('jwt', token, {
        maxAge: 1000 * 60 * 60 * 24 * 1,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    })
}

const resUserType = (user) => {
    return {
        id: user.id,
        email: user.email,
        role: user.role,
        username: user.username,
        location: user.location,
        basket: user.basket,
        favorite: user.favorite,
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
    await Basket.create({ userId: user.id })
    await Favorite.create({ userId: user.id })
    const token = await createToken(user)
    sendCookie(res, token)
    response(res, { user: resUserType(user), accessToken: token }, 201, 'you successfully sign up')
})

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return next(new AppError('Please provide email and password', 400))
    }
    const user = await User.findOne({
        where: { email },
        include: [
            { model: Location, attributes: { exclude: ['userId'] } },
            { model: Basket, include: [{ model: Product }] },
            { model: Favorite, include: [{ model: Product }] },
        ],
    })

    if (!user) {
        return next(new AppError('User not found', 404))
    }

    if (password !== user.password) {
        return next(new AppError('Incorrect password', 401))
    }

    const token = await createToken(user)
    const newUser = await User.findByPk(user.id, {
        include: [
            { model: Location, attributes: { exclude: ['userId'] } },
            { model: Basket, include: [{ model: Product, include: ProductDetail }] },
            { model: Favorite, include: [{ model: Product, include: ProductDetail }] },
        ],
    })
    sendCookie(res, token)
    response(res, { user: resUserType(newUser), accessToken: token }, 201, 'you successfully sign in')
})

exports.changePassword = catchAsync(async (req, res, next) => {
    const { newPassword, oldPassword, newPasswordConfirm } = req.body
    const user = await User.findOne({ where: { password: oldPassword } })
    if (!user) {
        return next(new AppError('wrong password'))
    }
    if (newPassword !== newPasswordConfirm) {
        return next(new AppError('password not the same', 401))
    }

    if (user.password !== oldPassword) {
        return next(new AppError('Incorrect password', 401))
    }

    const code = digitNumber(6)

    await sendGrid('', code)
    user.code = code
    user.newPassword = newPassword
    await user.save()
    response(res, { code }, 200, 'You are successfully send code')
})

exports.checkCode = catchAsync(async (req, res, next) => {
    const code = req.body.code
    const user = await User.findOne({ where: { code } })
    if (!user) {
        return next(new AppError('You are invalid code', 400))
    }

    user.password = user.newPassword
    await user.save()
    response(res, {}, 200, 'You are successfully send code')
})

exports.protect = catchAsync(async (req, res, next) => {
    let token
    if (req.cookies.jwt) {
        token = req.cookies.jwt
    } else if (req?.headers?.authorization?.split(' ')[0] === 'Bearer' && req?.headers?.authorization) {
        token = req.headers.authorization.split(' ')[1]
    } else {
        return next(new AppError('Token not found', 401))
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)

    const time = new Date().getTime()

    if (!decoded || !(decoded.exp <= time)) {
        return next(new AppError('Token is not valid', 401))
    }

    const user = await User.findOne({
        attributes: ['id', 'email', 'password', 'username', 'role'],
        where: { id: decoded.id },
    })

    if (!user) {
        return new AppError('User not found', 404)
    }
    req.user = user
    next()
})

exports.userSelf = catchAsync(async (req, res, next) => {
    const id = req.user.id
    const user = await User.findByPk(id, {
        include: [
            { model: Location, attributes: { exclude: ['userId'] } },
            {
                model: Basket,
                attributes: { exclude: ['userId'] },
                include: [{ model: Product, include: ProductDetail }],
            },
            { model: Favorite, include: [{ model: Product, include: ProductDetail }] },
        ],
    })
    response(res, { user: resUserType(user) }, 200, 'You are refresh page')
})

exports.logout = catchAsync(async (req, res, next) => {
    sendCookie(res, 'loggedOut')
    response(res, '', 206, 'You are successfully logout')
})

exports.role = (roles) => {
    return async (req, res, next) => {
        try {
            // 1) User ni roleni olamiz databasedan, tekshiramiz
            if (!roles.includes(req.user.role)) {
                return next(new AppError("You don't access this process", 405))
            }
            next()
        } catch (error) {
            next(new AppError(error.message, 404))
        }
    }
}

function digitNumber(count) {
    var chars = '0123456789'.split('')
    var result = ''
    for (var i = 0; i < count; i++) {
        var x = Math.floor(Math.random() * chars.length)
        result += chars[x]
    }
    return result
}
