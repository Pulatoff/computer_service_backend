const router = require('express').Router()
const controller = require('../controllers/basketController')
const auth = require('../controllers/authController')

router.route('/').post(auth.protect, controller.addToBasket)

module.exports = router
