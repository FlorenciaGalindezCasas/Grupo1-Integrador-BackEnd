const { DataTypes, Model } = require("sequelize");
const sequelize = require('../config/sequelize');
const Product = require('./product.model');

class License extends Model {}

License.init({
	license_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	license_name: {
		type: DataTypes.STRING(45),
		unique: true,
		allowNull: false
	},
	license_description: {
			type: DataTypes.STRING(255),
			allowNull: false
	},
	license_image: {
			type: DataTypes.STRING(255)
	}
}, {
	sequelize,
	modelName: "License"
});

module.exports = License;