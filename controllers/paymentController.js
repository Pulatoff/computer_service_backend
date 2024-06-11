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

exports.PayByCard = catchError(async (req, res, next) => {
    const { card_number, expire_date, order_id } = req.body
    const order = await Order.findByPk(order_id, { include: [{ model: Transaction }] })
    if (!order) {
        next(new AppError('Order not found', 400))
    }
    console.log(card_number, 'CARD NUMBER')
    console.log(expire_date, 'EXPIRE_DATE')
    const { result, error } = await callMYUZCARD(
        'POST',
        {
            amount: `${order.amount}`,
            cardNumber: card_number,
            expireDate: expire_date,
            extraId: order?.transaction?.id,
        },
        '/Payment/paymentWithoutRegistration'
    )

    const transaction = await Transaction.findByPk(order.transaction.id)

    if (error) {
        next(new AppError(error.errorMessage, 400))
    }

    transaction.transaction_id = result.transactionId
    transaction.session = result.session
    await transaction.save()

    response(res, {}, 200, 'sended to phone sms  otp message')
})
