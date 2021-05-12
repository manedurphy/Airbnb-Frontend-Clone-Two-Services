const { DataTypes, Model } = require('sequelize');
const sequelize = require('../data/db');
const Host = require('./Host');

class HostedBy extends Model {}

HostedBy.init(
    {
        duringYourStay: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        responseTime: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        responseRate: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        HostId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        PropertyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'HostedBy',
        timestamps: false,
    }
);

HostedBy.belongsTo(Host);
module.exports = HostedBy;
