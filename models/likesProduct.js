const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')

const likes = sequelize.define(
    'likes',
    {
        id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
        productId: { type: DataTypes.UUID },
    },
    {
        timestamps: true,
        createdAt: true,
        updatedAt: false,
    }
)

module.exports = likes
