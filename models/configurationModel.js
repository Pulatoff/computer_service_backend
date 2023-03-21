const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')
const Product = require('./productsModel')

const Configuration = sequelize.define(
    'configurations',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        type: { type: DataTypes.STRING, allowNull: false },
    },
    { timestamps: true, updatedAt: false, createdAt: true }
)

Configuration.hasMany(Product)
Product.belongsTo(Configuration)

module.exports = Configuration
