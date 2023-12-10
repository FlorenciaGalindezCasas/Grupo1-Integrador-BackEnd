const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class User extends Model {}

User.init({
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(16),
  },
  lastname: {
    type: DataTypes.STRING(80)
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING(32),
    allowNull: false
  }
}, {
  sequelize,
  modelName: "User"
});

module.exports = User;