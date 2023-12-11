const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const Product = require("./product.model");


class Cart extends Model{}

Cart.init({
  cart_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cantidad: {
    type: DataTypes.INTEGER,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
  },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: "product_id"
    }
  }
},{
    sequelize,
    modelName: "Cart"
});


Cart.hasOne(Product, { foreignKey: "product_id", sourceKey: "product_id" });

module.exports = Cart;