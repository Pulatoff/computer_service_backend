const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')
const Order = require('./orderModel')

const Transaction = sequelize.define(
    'transactions',
    {
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        amount: { type: DataTypes.INTEGER, allowNull: false },
        session: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        transaction_id: { type: DataTypes.INTEGER, allowNull: false },
        cancel_at: { type: DataTypes.DATE, allowNull: true },
        payment_status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'pendingPayment' },
        is_payed: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    { timestamps: true, createdAt: true, updated_at: false }
)

Order.hasOne(Transaction, { foreignKey: 'order_id' })
Transaction.belongsTo(Order)

module.exports = Transaction
