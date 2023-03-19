const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')
const User = require('./userModel')

const Favorite = sequelize.define('favorites', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
})

User.hasOne(Favorite)
Favorite.belongsTo(User)

module.exports = Favorite
