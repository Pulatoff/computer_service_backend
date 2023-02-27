const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')
// models
const Product = require('./productsModel')
const User = require('./userModel')
const Location = require('./locationsModel')

const Basket = sequelize.define(
    'baskets',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    },
    { timestamps: true, createdAt: true, updatedAt: false }
)

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(Location)
Location.belongsTo(Basket)

module.exports = Basket
