const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');
const License = require('./license.model');
const Category = require('./category.model');

class Product extends Model {}

Product.init({
  product_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  product_name: {
    type: DataTypes.STRING(60),
    allowNull: false,
    unique: true
  },
  product_description: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER
  },
  discount: {
    type: DataTypes.INTEGER
  },
  sku: {
    type: DataTypes.STRING(30),
  },
  dues: {
    type: DataTypes.INTEGER
  },
  image_front: {
    type: DataTypes.STRING(200),
  },
  image_back: {
    type: DataTypes.STRING(200),
  },
  license_id: {
    type: DataTypes.INTEGER,
    references: {
      model: License,
      key: "license_id"     
    }
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: "category_id"
    }
  }
}, {
  sequelize,
  modelName: "Product"
});

Product.hasOne(License, { foreignKey: 'license_id', sourceKey: "license_id" });
Product.hasOne(Category, { foreignKey: 'category_id' });

module.exports = Product;