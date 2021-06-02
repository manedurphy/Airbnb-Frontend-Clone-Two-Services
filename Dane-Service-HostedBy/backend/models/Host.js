const { DataTypes, Model } = require('sequelize');
const sequelize = require('../data/db');

class Host extends Model {}

Host.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        about: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
        numberOfReviews: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0,
        },
        identityVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        isSuperhost: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        joinedOn: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date(),
        },
    },
    {
        sequelize,
        modelName: 'Host',
        timestamps: false,
    },
);

module.exports = Host;
