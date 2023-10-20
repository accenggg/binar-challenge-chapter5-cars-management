"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Car.hasMany(models.User, {
        foreignKey: {
          name: "carsId",
        },
      });

      Car.hasOne(models.TraceCar, {
        foreignKey: {
          name: "carId",
        },
      });
    }
  }
  Car.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(["Available", "Not Available"]),
        defaultValue: "Available",
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.TEXT,
        defaultValue:
          "https://tse2.mm.bing.net/th?id=OIP.U2iQ7wNK6ZzTW_traW_-PQHaHa&pid=Api&P=0&h=180",
      },
    },
    {
      sequelize,
      modelName: "Car",
    }
  );
  return Car;
};
