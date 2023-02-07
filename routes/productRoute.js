const router = require('express').Router()
const controller = require('../controllers/productController')

router.route('/').post(controller.addProduct)
// Router.route("/:id").delete(delete1).get(getOne).patch(update);

module.exports = router
