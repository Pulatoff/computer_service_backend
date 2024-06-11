const hashPassword = require('../utility/hashpass')
const validator = require('validator')
const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')

const User = sequelize.define(
    'users',
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: { type: DataTypes.STRING, allowNull: false, lowercase: true },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: { type: DataTypes.STRING, defaultValue: 'user' },
        activ: { type: DataTypes.BOOLEAN, defaultValue: true },
        code: { type: DataTypes.STRING },
        newPassword: { type: DataTypes.STRING },
    },
    { timestamps: true, createdAt: true, updatedAt: false }
)

module.exports = User
