const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')
// models
const Product = require('./productsModel')
const User = require('./userModel')

const Basket = sequelize.define(
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

Product.hasMany(Basket)
Basket.belongsTo(Product)

User.hasMany(Basket)
Basket.belongsTo(User)

module.exports = Basket
