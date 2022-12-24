const sequelize = require('../configs/db')

const Workers = sequelize.define(
    'workers',
    {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        first_name: { type: DataTypes.STRING, allowNull: false },
        last_name: { type: DataTypes.STRING, allowNull: false },
        middle_name: { type: DataTypes.STRING, allowNull: false },
        phone: { type: DataTypes.STRING, allowNull: false },
        status: { type: DataTypes.INTEGER, allowNull: false },
        experience: { type: DataTypes.STRING, allowNull: false },
        review_id: { type: DataTypes.STRING, allowNull: false }, // boshqa table
    },
    {
        timestamps: true,
        createdAt: true,
        updatedAt: false,
    }
)

module.exports = Workers
