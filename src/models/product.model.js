const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const License = require('./license.model');
const Category = require('./category.model');

const Product = sequelize.define('Product', {
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
      key: "id"     
    }
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: "id"
    }
  }
})

Product.associations = (models) => {
  Product.hasOne(models.License, { foreignKey: "license_id", as: "license" });
  Product.hasOne(models.Category, { foreignKey: "category_id", as: "category" });
}

module.exports = Product;