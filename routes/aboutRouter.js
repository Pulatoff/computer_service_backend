const router = require('express').Router()
const controller = require('../controllers/aboutController')

router.route('/').post(controller.upload, controller.addAbout).get(controller.getAbout)
router.route('/ru').post(controller.addAboutRu)

module.exports = router
