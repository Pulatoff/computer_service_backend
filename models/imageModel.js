const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')

const Image = sequelize.define('images', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    image_name: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.BLOB },
})

module.exports = Image
