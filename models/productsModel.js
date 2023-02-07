const { DataTypes } = require('sequelize')
const sequelize = require('../configs/db')
const Brand = require('./brandsModel')
const Category = require('./categoriesModel')

const Product = sequelize.define(
    'products',
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false, validate: { min: 3, max: 250 } },
        image_main: { type: DataTypes.STRING, allowNull: false },
        views: { type: DataTypes.INTEGER, defaultValue: 1 },
    },
    { timestamps: true, createdAt: true, updatedAt: false }
)

Category.hasMany(Product)
Product.belongsTo(Category)

Brand.hasMany(Product)
Product.belongsTo(Brand)

module.exports = Product
