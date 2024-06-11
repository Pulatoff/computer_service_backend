const sequelize = require('../configs/db')
const { DataTypes } = require('sequelize')
const Favorite = require('./favoriteModel')
const Product = require('./productsModel')

const FavoriteProduct = sequelize.define('favorite_products', {
    count: { type: DataTypes.INTEGER, defaultValue: 1 },
})

Favorite.belongsToMany(Product, { through: FavoriteProduct })
Product.belongsToMany(Favorite, { through: FavoriteProduct })

module.exports = FavoriteProduct
