const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');
const Product = require('./product.model');

class Category extends Model {}

Category.init({
  category_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  category_name: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false
  },
  category_description: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  sequelize,
  modelName: "Category"
});

module.exports = Category;