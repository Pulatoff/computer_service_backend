const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')
const Service = require('./servicesModel')

const ServiceRu = sequelize.define(
    'servicesRu',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        features: { type: DataTypes.ARRAY(DataTypes.STRING) },
        resolve_problems: { type: DataTypes.ARRAY(DataTypes.STRING) },
        description: { type: DataTypes.TEXT, allowNull: true },
    },
    { timestamps: true, createdAt: true, updatedAt: false }
)

Service.hasOne(ServiceRu)
ServiceRu.belongsTo(Service)

module.exports = ServiceRu
