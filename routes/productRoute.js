const router = require('express').Router()
const controller = require('../controllers/productController')
const auth = require('../controllers/authController')

router.route('/').post(controller.upload, controller.addProduct).get(controller.getAllProducts)
router.route('/search').get(controller.searchProducts)
router.route('/favorites').post(auth.protect, controller.addToFavorite)
router.route('/images/:image_name').get(controller.sendImage)

router.route('/:id').get(controller.getOneProduct).patch(controller.updateProduct).delete(controller.deleteProduct)

router.route('/:productId/review').post(auth.protect, controller.addReview)

module.exports = router
