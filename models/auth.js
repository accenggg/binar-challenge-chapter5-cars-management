"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Auth extends Model {
    static associate(models) {
      // define association here
      Auth.belongsTo(models.User, {
        foreignKey: {
          name: "userId",
          allowNull: false,
        },
      });
    }
  }
  Auth.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      confirmPassword: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Auth",
    }
  );
  return Auth;
};
