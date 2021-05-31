const { DataTypes, Model } = require('sequelize');
const sequelize = require('../data/db');

class CoHost extends Model {}

CoHost.init(
    {
        HostId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        HostedById: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'CoHost',
        timestamps: false,
    },
);

module.exports = CoHost;
