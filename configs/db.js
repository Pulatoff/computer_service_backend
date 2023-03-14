const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('service', 'postgres', 'niyozbek', {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    logging: false,
})

module.exports = sequelize
