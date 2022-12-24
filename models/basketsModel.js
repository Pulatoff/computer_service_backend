const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')
const Product = require('./productsModel')

const Baskets = sequelize.define(
    'baskets',
    {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        status: { type: DataTypes.INTEGER, allowNull: false },
        order_time: { type: DataTypes.DATE, allowNull: false },
        product_id: { type: DataTypes.STRING, allowNull: false }, //boshqa table
        user_id: { type: DataTypes.STRING, allowNull: false }, //boshqa table
    },
    {
        timestamps: true,
        createdAt: true,
        updatedAt: false,
    }
)

Product.hasMany(Baskets)

module.exports = Baskets
