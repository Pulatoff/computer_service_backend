const sequelize = require('../configs/db')
const User = require('./userModel')
const Basket = require('./basketsModel')

const BasketUser = sequelize.define('basket_users', {}, { timestamps: false })

User.belongsToMany(Basket, { through: BasketUser })
Basket.belongsToMany(User, { through: BasketUser })

module.exports = BasketUser
