const { DataTypes } = require('sequelize')
const sequelize = require('../configs/db')
const Category = require('./categoriesModel')

const CategoryRu = sequelize.define(
    'categoriesRu',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: { notEmpty: true, min: 3, max: 40 } },
    },
    { timestamps: true, createdAt: true, updatedAt: false }
)

Category.hasOne(CategoryRu)
CategoryRu.belongsTo(Category)

module.exports = CategoryRu
