const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')

const categoryLittle = sequelize.define(
    'categoryLittles',
    {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        photo: { type: DataTypes.STRING, allowNull: false },
        categoryId: { type: DataTypes.UUID, allowNull: false },
    },
    { timestamps: true, createdAt: true, updatedAt: false }
)

module.exports = categoryLittle
