const auth = require('../controllers/authController')
const Router = require('express').Router()

Router.route('/signup').post(auth.signUp)
Router.route('/signin').post(auth.login)

module.exports = Router
