const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')
const User = require('./userModel')

const Order = sequelize.define(
    'orders',
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        comment: { type: DataTypes.TEXT, allowNull: true },
        location: { type: DataTypes.TEXT, allowNull: true },
        amount: { type: DataTypes.BIGINT, allowNull: false },
        phone_number: { type: DataTypes.STRING, allowNull: false },
        full_name: { type: DataTypes.TEXT },
        status: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        payment_status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'new' },
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
