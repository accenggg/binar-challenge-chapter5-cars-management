"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Auth, {
        foreignKey: {
          name: "userId",
        },
      });

      User.hasOne(models.Cars, {
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: DataTypes.INTEGER,
      role: {
        type: DataTypes.ENUM(["Superadmin", "Admin", "Member"]),
        defaultValue: "Member",
        allowNull: false,
      },
      address: DataTypes.STRING,
      carsId: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
