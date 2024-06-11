const sequelize = require('../configs/db')

const { DataTypes } = require('sequelize')
const Image = require('./imageModel')

const Spiner = sequelize.define(
    'spiners',
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        firstText: { type: DataTypes.TEXT, allowNull: false },
        secondText: { type: DataTypes.TEXT, allowNull: false },
        thirdText: { type: DataTypes.TEXT, allowNull: false },
        image: { type: DataTypes.TEXT, allowNull: false },
        backgroundImage: { type: DataTypes.TEXT, allowNull: false },
    },
    { timestamps: false }
)

module.exports = Spiner
