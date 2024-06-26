const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')
// models
const Product = require('./productsModel')

const ProductDetail = sequelize.define(
    'product_details',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        price: { type: DataTypes.BIGINT, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: false },
        colors: { type: DataTypes.STRING, defaultValue: 'black' },
        condition: { type: DataTypes.STRING, allowNull: false },
        images: {
            type: DataTypes.TEXT,
            get() {
                return this.getDataValue('images').split(';')
            },
            set(val) {
                this.setDataValue('images', val.join(';'))
            },
            allowNull: false,
        },
        specifications: { type: DataTypes.JSON, allowNull: true },
        image_urls: {
            type: DataTypes.TEXT,
            get() {
                return this.getDataValue('image_urls').split(';')
            },
            set(val) {
                this.setDataValue('image_urls', val.join(';'))
            },
            allowNull: false,
        },
    },
    { timestamps: true, createdAt: true, updatedAt: false }
)

Product.hasOne(ProductDetail)
ProductDetail.belongsTo(Product)

module.exports = ProductDetail
