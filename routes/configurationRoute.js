const router = require('express').Router()
const controller = require('../controllers/configurationController')

router.route('/').get(controller.getAllConfiguration).post(controller.addToConfiguration)

router
    .route('/:id')
    .get(controller.getOneConfiguration)
    .patch(controller.updateConfiguration)
    .delete(controller.deleteConfiguration)

module.exports = router
