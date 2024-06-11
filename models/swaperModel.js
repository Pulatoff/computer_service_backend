const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')
const Product = require('./productsModel')

const Swaper = sequelize.define(
    'swaper_products',
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        title: { type: DataTypes.STRING, allowNull: false },
        imageUrl: { type: DataTypes.TEXT, allowNull: false },
    },
    { timestamps: true, createdAt: true, updatedAt: false }
)

Product.hasMany(Swaper)
Swaper.hasOne(Product)

module.exports = Swaper
