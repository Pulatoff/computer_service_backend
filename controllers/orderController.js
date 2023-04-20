const Order = require('../models/orderModel')
const OrderProduct = require('../models/orderProductModel')
const Product = require('../models/productsModel')
const ProductDetail = require('../models/productDetailsModel')
const CatchError = require('../utility/catchAsync')
const response = require('../utility/response')

exports.addOrder = CatchError(async (req, res, next) => {
    const { location, comment, amount, phone_number, full_name, products } = req.body
    const order = await Order.create({ location, amount, comment, phone_number, full_name, products })

    for (let i = 0; i < products.length; i++) {
        await OrderProduct.create({ orderId: order.id, productId: products[i].id, amount: products[i].amount })
    }
    response(res, '', 201, 'You are successfully order products')
})

exports.getAllOrders = CatchError(async (req, res, next) => {
    const orders = await Order.findAll({ where: { status: 0 }, include: [{ model: Product, include: ProductDetail }] })
    response(res, { orders }, 200, 'You are successfully get order products')
})

exports.statusOrder = CatchError(async (req, res, next) => {
    const { status } = req.body
    const id = req.params.id

    const order = await Order.findByPk(id)
    order.status = status || order.status
    await order.save()
    response(res, '', 201, 'You are successfully order products')
})
