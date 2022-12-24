const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')

const Services = sequelize.define(
    'services',
    {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        service_types_id: { type: DataTypes.STRING, allowNull: false }, //boshqa table
    },
    {
        timestamps: true,
        createdAt: true,
        updatedAt: false,
    }
)

module.exports = Services
