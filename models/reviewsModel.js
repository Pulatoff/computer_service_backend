const sequelize = require('../configs/db')

const Reviews = sequelize.define(
    'reviews',
    {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        body: { type: DataTypes.TEXT, allowNull: false },
        rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 0, max: 5 } },
    },
    {
        timestamps: true,
        createdAt: true,
        updatedAt: false,
    }
)

module.exports = Reviews
