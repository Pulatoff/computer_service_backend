const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')
// models
const User = require('./userModel')

const Location = sequelize.define(
    'locations',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        section_number: { type: DataTypes.STRING, allowNull: false },
        city: { type: DataTypes.STRING, allowNull: false },
        entrance_number: { type: DataTypes.INTEGER, allowNull: false },
        street: { type: DataTypes.STRING, allowNull: false },
        home_number: { type: DataTypes.INTEGER, allowNull: false },
        comment: { type: DataTypes.TEXT, allowNull: true },
    },
    { timestamps: true, createdAt: true, updatedAt: false }
)

User.hasOne(Location)
Location.belongsTo(User)

module.exports = Location
