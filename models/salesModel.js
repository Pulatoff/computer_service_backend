const sequelize = require('../configs/db')
const Product = require('./productsModel')

const Sale = sequelize.define(
    'sales',
    {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        discount: { type: DataTypes.INTEGER, allowNull: false },
        start_date: { type: DataTypes.DATE, allowNull: false },
        end_date: { type: DataTypes.DATE, allowNull: false },
    },
    { timestamps: true, createdAt: true, updatedAt: false }
)

Product.hasOne(Sale)
Sale.belongsTo(Product)

module.exports = Sale
