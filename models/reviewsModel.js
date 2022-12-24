const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')
const Product = require('./productsModel')

const Review = sequelize.define(
    'reviews',
    {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        body: { type: DataTypes.TEXT, allowNull: false },
        rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 0, max: 5 } },
    },
    { timestamps: true, createdAt: true, updatedAt: false }
)

Product.hasMany(Review)
Review.belongsTo(Product)

module.exports = Review
