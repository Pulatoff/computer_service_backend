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
            unique: true,
            validate: { isAlphanumeric: true, len: [3, 20] },
        },
        email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true }, lowercase: true },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                min: 8,
                max: 20,
                strongPass(value) {
                    if (!validator.isStrongPassword(value)) {
                        throw new Error('Password is not strong enough')
                    }
                },
            },
        },
        role: { type: DataTypes.STRING, defaultValue: 'user' },
        activ: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    { timestamps: true, createdAt: true, updatedAt: false }
)

User.beforeCreate(async (user, options) => {
    const password = await hashPassword(user.password)
    user.password = password
})

module.exports = User
