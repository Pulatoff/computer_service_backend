const { DataTypes } = require('sequelize')
const sequelize = require('../configs/db')

const ProductImages = sequelize.define(
    'images',
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        image_name: { type: DataTypes.STRING, allowNull: false },
        image_binary: { type: DataTypes.BLOB, allowNull: true },
    },
    { timestamps: true, createdAt: true }
)

ProductDetails.hasMany(ProductImages)
ProductImages.belongsTo(ProductDetails)

module.exports = ProductImages
