const { DataTypes, Model } = require('sequelize');
const sequelize = require('../data/db');
const Property = require('./Property');

class Photo extends Model {}

Photo.init(
	{
		link: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		isMain: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		PropertyId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'Photo',
	}
);

Photo.belongsTo(Property);
module.exports = Photo;
