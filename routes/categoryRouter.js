const router = require('express').Router()
const controller = require('../controllers/categoryController')
const auth = require('../controllers/authController')

router.route('/').post(controller.addCategory).get(controller.getAllCategories)


module.exports = router
