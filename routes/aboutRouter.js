const router = require('express').Router()
const controller = require('../controllers/aboutController')

router.route('/').post(controller.upload, controller.addAbout).get(controller.getAbout)

module.exports = router
