const router = require('express').Router()
const controller = require('../controllers/productController')

router.route('/').post(controller.upload, controller.addProduct).get(controller.getAllProducts)

router.route('/:id').get(controller.getOneProduct)
// Router.route("/:id").delete(delete1).get(getOne).patch(update);

module.exports = router
