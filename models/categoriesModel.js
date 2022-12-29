const { DataTypes } = require('sequelize')
const sequelize = require('../configs/db')

const Category = sequelize.define(
    'categories',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: { notEmpty: true, min: 3, max: 40 } },
        photo: { type: DataTypes.STRING },
    },
    { timestamps: true, createdAt: true, updatedAt: false }
)

module.exports = Category
