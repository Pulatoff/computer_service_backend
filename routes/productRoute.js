const router = require('express').Router()
const controller = require('../controllers/productController')

router.route('/').post(controller.upload, controller.addProduct).get(controller.getAllProducts)
router.route('/search').get(controller.searchProducts)
router.route('/:id').get(controller.getOneProduct).patch(controller.updateProduct).delete(controller.deleteProduct)

module.exports = router
