const { DataTypes, Model } = require('sequelize');
const sequelize = require('../data/db');

class Host extends Model {}

Host.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        about: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
        numberOfReviews: {
            type: DataTypes.BIGINT,
            allowNull: false,
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
        },
    },
    {
        sequelize,
        modelName: 'Host',
        timestamps: false,
    }
);

module.exports = Host;
