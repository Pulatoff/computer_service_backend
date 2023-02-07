const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('defaultdb', 'doadmin', 'AVNS_5Lgv70KVPpGWNPXgtKP', {
    dialect: 'postgres',
    host: 'main-database-do-user-12917150-0.b.db.ondigitalocean.com',
    port: 25060,
    logging: false,
    ssl: true,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
})

module.exports = sequelize
