const sequelize = require("../configs/db");
const { DataTypes } = require("sequelize");
const Brands = sequelize.define("brands", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 3,
      max: 20,
    },
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Brands;
