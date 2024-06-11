const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')
const About = require('./aboutModel')
const AboutRu = sequelize.define(
    'aboutsRu',
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        text: { type: DataTypes.TEXT },
    },
    { timestamps: false }
)

About.hasOne(AboutRu)
AboutRu.belongsTo(About)

module.exports = AboutRu
