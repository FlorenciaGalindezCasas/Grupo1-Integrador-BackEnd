const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Product = require('./product.model');

const Category = sequelize.define('Category', {
  category_name: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false
  },
  category_description: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
});

Category.associations = (models) => {
  Category.hasMany(models.Product, { as: 'products' });
};

module.exports = Category;