const router = require('express').Router()
const controller = require('../controllers/paymentController')

router.route('/').post(controller.PayByCard)
router.route('/confirm').post(controller.ConfirmPayment)

module.exports = router
