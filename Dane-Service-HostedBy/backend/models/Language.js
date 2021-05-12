const { DataTypes, Model } = require('sequelize');
const sequelize = require('../data/db');

class Language extends Model {}

Language.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Language',
        timestamps: false,
    }
);

module.exports = Language;
