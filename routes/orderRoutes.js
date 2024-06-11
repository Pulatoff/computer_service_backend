const router = require('express').Router()
const controller = require('../controllers/orderController')

router.route('/').post(controller.addOrder).get(controller.getAllOrders)
router.route('/:id').post(controller.statusOrder)
module.exports = router
