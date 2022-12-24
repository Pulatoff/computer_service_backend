const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')

const SubmitVacancy = sequelize.define(
    'submitVacancies',
    {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        status: { type: DataTypes.INTEGER, allowNull: false, defaultValue: '1' },
    },
    {
        timestamps: true,
        createdAt: true,
        updatedAt: false,
    }
)

module.exports = SubmitVacancy
