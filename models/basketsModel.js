const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')
// models
const User = require('./userModel')

const Basket = sequelize.define(
    'baskets',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    },
    { timestamps: false }
)

User.hasOne(Basket)
Basket.belongsTo(User)

module.exports = Basket
