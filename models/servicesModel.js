const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')

const Service = sequelize.define(
    'services',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        image: { type: DataTypes.STRING, allowNull: false },
        image_url: { type: DataTypes.TEXT, allowNull: false },
        features: { type: DataTypes.ARRAY(DataTypes.STRING) },
        resolve_problems: { type: DataTypes.ARRAY(DataTypes.STRING) },
        description: { type: DataTypes.TEXT, allowNull: true },
        phone: { type: DataTypes.STRING, allowNull: true },
    },
    { timestamps: true, createdAt: true, updatedAt: false }
)

module.exports = Service
