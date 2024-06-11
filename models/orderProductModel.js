const sequelize = require('../configs/db')
const Product = require('./productsModel')
const Order = require('./orderModel')
const { DataTypes } = require('sequelize')

const OrderProduct = sequelize.define(
    'order_products',
    {
        amount: { type: DataTypes.INTEGER, defaultValue: 1 },
    },
    { timestamps: true, createdAt: true, updatedAt: true }
)

Order.belongsToMany(Product, { through: OrderProduct })
Product.belongsToMany(Order, { through: OrderProduct })

module.exports = OrderProduct
