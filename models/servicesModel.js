const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')

const Service = sequelize.define(
    'services',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        image: { type: DataTypes.STRING, allowNull: false },
        image_url: { type: DataTypes.TEXT, allowNull: false },
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
        phone: { type: DataTypes.STRING, allowNull: true },
    },
    { timestamps: true, createdAt: true, updatedAt: false }
)

module.exports = Service
