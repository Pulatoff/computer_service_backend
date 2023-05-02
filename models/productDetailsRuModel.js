const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')
// models
const ProductDetail = require('./productDetailsModel')

const ProductDetailRu = sequelize.define(
    'product_detailsRu',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        description: { type: DataTypes.TEXT, allowNull: false },
        colors: { type: DataTypes.STRING, defaultValue: 'black' },
        specifications: { type: DataTypes.JSON, allowNull: true },
    },
    { timestamps: true, createdAt: true, updatedAt: false }
)

ProductDetail.hasOne(ProductDetailRu)
ProductDetailRu.belongsTo(ProductDetail)

module.exports = ProductDetailRu
