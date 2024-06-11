const router = require('express').Router()
const controller = require('../controllers/spinerController')

router.route('/').post(controller.upload, controller.addSpiner).get(controller.getSpiner)

module.exports = router
