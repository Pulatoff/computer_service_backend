const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.NODE_ENV === 'production' ? 25060 : 5432,
    logging: false,
})

module.exports = sequelize
