const { DataTypes, Model } = require('sequelize');
const sequelize = require('../data/db');

class Property extends Model {}

Property.init(
	{
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		hostId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'Property',
	}
);

module.exports = Property;
