const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')
const User = require('./userModel')

const Order = sequelize.define(
    'orders',
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        comment: { type: DataTypes.TEXT, allowNull: true },
        location: { type: DataTypes.TEXT, allowNull: false },
        amount: { type: DataTypes.BIGINT, allowNull: false },
        status: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    },
    { timestamps: true, createdAt: true, updatedAt: false }
)

User.hasMany(Order)
Order.belongsTo(User)

module.exports = Order

// STATUS of Orders
//  0 = packing order
//  1 = order on way
// -1 = rejected order
//  2 = ordered
