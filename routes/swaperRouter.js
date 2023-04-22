const router = require('express').Router()
const controller = require('../controllers/swaperController')

router.route('/').post(controller.upload, controller.addSwaper).get(controller.getAllSwapers)

module.exports = router
