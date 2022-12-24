const { signUp, login } = require('../controllers/authController')

const Router = require('express').Router()
Router.route('/signup').post(signUp)
Router.route('/login').post(login)

module.exports = Router
