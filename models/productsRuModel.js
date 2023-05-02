const { DataTypes } = require('sequelize')
const sequelize = require('../configs/db')
const Product = require('./productsModel')

const ProductRu = sequelize.define(
    'productsRu',
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false, validate: { min: 3, max: 250 } },
    },
    { timestamps: true, createdAt: true, updatedAt: false }
)

Product.hasOne(ProductRu)
ProductRu.belongsTo(Product)

module.exports = ProductRu
