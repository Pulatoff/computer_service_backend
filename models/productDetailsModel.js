const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')
// models
const Product = require('./productsModel')

const ProductDetail = sequelize.define(
    'product_details',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        price: { type: DataTypes.BIGINT, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: false },
        colors: { type: DataTypes.ENUM, defaultValue: 'black', values: ['white', 'black', 'gray'] },
        condition: { type: DataTypes.STRING, allowNull: false },
        images: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
        specifications: { type: DataTypes.JSON, allowNull: true },
    },
    { timestamps: true, createdAt: true, updatedAt: false }
)

Product.hasOne(ProductDetail)
ProductDetail.belongsTo(Product)

module.exports = ProductDetail
