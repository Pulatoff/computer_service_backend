const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')

const Transaction = sequelize.define(
    'transactions',
    {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        amount: { type: DataTypes.BIGINT, allowNull: false },
        status: { type: DataTypes.INTEGER, allowNull: 0 },
    },
    { timestamps: true, createdAt: true, updatedAt: false }
)

module.exports = Transaction

// STATUS of Transaction
//  0 => waiting to confirm client
//  1 => finished transaction
// -1 => rejected transaction
