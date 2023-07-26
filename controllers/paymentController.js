const { callMYUZCARD } = require('../gateways/payment')
const Order = require('../models/orderModel')
const Transaction = require('../models/transactionsModel')
const AppError = require('../utility/appError')

// utils
const catchError = require('../utility/catchAsync')
const response = require('../utility/response')

exports.ConfirmPayment = catchError(async (req, res, next) => {
    const { otp, order_id } = req.body
    const order = await Order.findByPk(order_id, { include: [{ model: Transaction }] })
    const { result, error } = callMYUZCARD('POST', { otp, session }, '/Payment/confirmPayment')
    if (error) {
        next(new AppError('notugri parol', 400))
    }
    response(res, {}, 200, 'success')
})
