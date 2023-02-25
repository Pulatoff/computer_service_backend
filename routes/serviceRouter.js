const router = require('express').Router()
const controller = require('../controllers/serviceController')

router.route('/').post(controller.upload, controller.addService).get(controller.getServices)

router.route('/:id').get(controller.getOneService).patch(controller.updateService).delete(controller.deleteService)

module.exports = router
