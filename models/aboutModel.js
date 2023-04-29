const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')

const About = sequelize.define(
    'abouts',
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        images: { type: DataTypes.ARRAY, allowNull: false },
        text: { type: DataTypes.TEXT },
    },
    { timestamps: false }
)

module.exports = About
