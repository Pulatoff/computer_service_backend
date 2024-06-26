const { DataTypes } = require('sequelize')
const sequelize = require('../configs/db')
const Category = require('./categoriesModel')

const Product = sequelize.define(
    'products',
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false, validate: { min: 3, max: 250 } },
        image_main: { type: DataTypes.STRING, allowNull: false },
        views: { type: DataTypes.INTEGER, defaultValue: 1 },
        image_url: { type: DataTypes.TEXT },
        avg_rating: { type: DataTypes.FLOAT, defaultValue: 0 },
    },
    { timestamps: true, createdAt: true, updatedAt: false }
)

Category.hasMany(Product)
Product.belongsTo(Category)

module.exports = Product
