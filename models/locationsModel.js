const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')
// models
const User = require('./userModel')

const Location = sequelize.define(
    'locations',
    {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        country: { type: DataTypes.STRING, allowNull: false },
        city: { type: DataTypes.STRING, allowNull: false },
        district: { type: DataTypes.STRING, allowNull: false },
        street: { type: DataTypes.STRING, allowNull: false },
        home: { type: DataTypes.INTEGER, allowNull: false },
    },
    { timestamps: true, createdAt: true, updatedAt: false }
)

User.hasMany(Location)
Location.belongsTo(User)

module.exports = Location
