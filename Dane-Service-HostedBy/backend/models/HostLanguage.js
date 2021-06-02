const sequelize = require('../data/db');
const { DataTypes, Model } = require('sequelize');

class HostLanguage extends Model {}

HostLanguage.init(
    {
        HostId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        LanguageId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'HostLanguage',
        timestamps: false,
    },
);

module.exports = HostLanguage;
