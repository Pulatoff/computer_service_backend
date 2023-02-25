const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')

const Services = sequelize.define(
    'services',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        image: { type: DataTypes.STRING, allowNull: false },
        image_url: { type: DataTypes.TEXT, allowNull: false },
        features: { type: DataTypes.ARRAY(DataTypes.STRING) },
        resolve_problems: { type: DataTypes.ARRAY(DataTypes.STRING) },
    },
    { timestamps: true, createdAt: true, updatedAt: false }
)

module.exports = Services
