const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')
const Service = require('./servicesModel')

const ServiceRu = sequelize.define(
    'servicesRu',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        features: {
            type: DataTypes.TEXT,
            get() {
                return this.getDataValue('features').split(';')
            },
            set(val) {
                this.setDataValue('features', val.join(';'))
            },
        },
        resolve_problems: {
            type: DataTypes.TEXT,
            get() {
                return this.getDataValue('resolve_problems').split(';')
            },
            set(val) {
                this.setDataValue('resolve_problems', val.join(';'))
            },
        },
        description: { type: DataTypes.TEXT, allowNull: true },
    },
    { timestamps: true, createdAt: true, updatedAt: false }
)

Service.hasOne(ServiceRu)
ServiceRu.belongsTo(Service)

module.exports = ServiceRu
