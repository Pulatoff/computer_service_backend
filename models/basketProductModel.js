const { DataTypes } = require('sequelize')
const sequelize = require('../configs/db')
const Basket = require('./basketsModel')
const Product = require('./productsModel')

const BasketProduct = sequelize.define(
    'basket_products',
    {
        quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    },
    { timestamps: false }
)

Product.belongsToMany(Basket, { through: BasketProduct })
Basket.belongsToMany(Product, { through: BasketProduct })

module.exports = BasketProduct
