const router = require('express').Router()
const controller = require('../controllers/categoryController')
const auth = require('../controllers/authController')

router.route('/').post(controller.addCategory).get(controller.getAllCategories)
router.route('/image').post(controller.upload, controller.getImage)
router.route('/:id').get(controller.getOneCategory).patch(controller.updateCategory).delete(controller.deleteCategory)

module.exports = router
