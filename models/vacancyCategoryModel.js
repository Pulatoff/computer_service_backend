const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')

const VacancyCategory = sequelize.define(
    'vacancyCategories',
    {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
    },
    {
        timestamps: true,
    }
)

module.exports = VacancyCategory
