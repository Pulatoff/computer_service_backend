const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')
const Configuration = require('./configurationModel')

const ConfigurationRu = sequelize.define(
    'configurationsRu',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        type: { type: DataTypes.STRING, allowNull: false },
    },
    { timestamps: true, updatedAt: false, createdAt: true }
)

Configuration.hasOne(ConfigurationRu)
ConfigurationRu.belongsTo(Configuration)

module.exports = ConfigurationRu
