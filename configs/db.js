const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'postgres',
    host: process.env.DB_HOST,
})

// // users bilan commentlar  qo'shilishi
// db.users.hasOne(db.reviews, { onDelete: "CASCADE" });
// db.reviews.belongsTo(db.users, { onDelete: "CASCADE" });
// // users bilan commentlar qo'shilishi

// // userlarning elonlari qo'shilishi
// db.users.hasOne(db.submitVacancies, { onDelete: "CASCADE" });
// db.submitVacancies.belongsTo(db.users, { onDelete: "CASCADE" });
// // userlarning  elonlari qo'shilishi

// //

// db.vacancies.hasOne(db.submitVacancies, { onDelete: "CASCADE" });
// db.submitVacancies.belongsTo(db.vacancies, { onDelete: "CASCADE" });

//
// db.locations.hasOne(db.users, { onDelete: "CASCADE" });
// db.users.belongsTo(db.locations, { onDelete: "CASCADE" });

// db.vacancyCategories.hasOne(db.vacancies, { onDelete: "CASCADE" });
// db.vacancies.belongsTo(db.vacancyCategories, { onDelete: "CASCADE" });

// db.categories.hasMany(db.categoryLittles);
// db.categoryLittles.belongsTo(db.categories);
// db.products.belongsTo(db.productDetails);
// db.products.belongsTo(db.brands);
// db.products.belongsTo(db.categories);
// db.products.belongsTo(db.categoryLittles);

module.exports = sequelize
