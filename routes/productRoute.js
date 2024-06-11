const router = require('express').Router()
const controller = require('../controllers/productController')
const auth = require('../controllers/authController')

router.route('/').post(controller.upload, controller.addProduct).get(controller.getAllProducts)
router.route('/ru').post(controller.addProductRu)
router.route('/search').get(controller.searchProducts)
router.route('/favorites').post(auth.protect, controller.addToFavorite).delete(auth.protect, controller.deleteFavorites)
router.route('/images/:image_name').get(controller.sendImage)
router.route('/update/image/:id').post(controller.uploadImageMulter, controller.updateUploadImage)
router.route('/:id').get(controller.getOneProduct).patch(controller.updateProduct).delete(controller.deleteProduct)

router.route('/:productId/review').post(auth.protect, controller.addReview)

module.exports = router
