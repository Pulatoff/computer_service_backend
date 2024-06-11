const router = require('express').Router()
const controller = require('../controllers/categoryController')

router.route('/').post(controller.addCategory).get(controller.getAllCategories)
router.route('/ru').post(controller.addCategoryRu)
router.route('/:id').get(controller.getOneCategory).patch(controller.updateCategory).delete(controller.deleteCategory)

module.exports = router
