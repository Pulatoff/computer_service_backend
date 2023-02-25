const router = require('express').Router()
const controller = require('../controllers/serviceController')

router.route('/').post(controller.upload, controller.addService).get(controller.getServices)

module.exports = router
