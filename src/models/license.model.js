const { DataTypes } = require("sequelize");
const sequelize = require('../config/sequelize');
const Product = require('./product.model');

const License = sequelize.define("License", {
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
});

License.associations = (models) => {
    License.hasMany(models.Product, { as: 'products' });
}

module.exports = License;