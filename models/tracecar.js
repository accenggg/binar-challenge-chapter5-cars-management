"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TraceCar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TraceCar.belongsTo(models.Car, {
        foreignKey: {
          name: "carId",
        },
      });
    }
  }
  TraceCar.init(
    {
      createdBy: DataTypes.STRING,
      deletedBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
      carId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TraceCar",
    }
  );
  return TraceCar;
};
