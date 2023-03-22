const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')
const Product = require('./productsModel')
const Order = require('./orderModel')

const OrderProduct = sequelize.define('order_products', {})

Order.belongsToMany(Product, { through: OrderProduct })
