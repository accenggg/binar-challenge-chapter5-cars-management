const { Car, TraceCar } = require("../models");
const ApiError = require("../utils/apiError");
const pascalCase = require("../lib/pascalCase");

const createCar = async (req, res, next) => {
  const { name, price, status } = req.body;
  try {
    const whoAccess = req.user.name;

    const car = await Car.findOne({
      where: {
        name,
      },
    });

    if (car) return next(new ApiError("nama mobil sudah ada", 400));

    if (status === "Available" || status === "Not Available") {
      const newCar = await Car.create({
        name,
        price,
        status,
      });

      const newTraceCar = await TraceCar.create({
        createdBy: whoAccess,
        updatedBy: whoAccess,
        carId: newCar.id,
      });

      res.status(201).json({
        status: "Success",
        data: {
          ...newCar,
          createdBy: newTraceCar.createdBy,
          deletedBy: newTraceCar.deletedBy,
          updatedBy: newTraceCar.updatedBy,
        },
      });
    } else {
      return next(
        new ApiError("format status adalah 'Available' atau 'Not Available'.")
      );
    }
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const findCars = async (req, res, next) => {
  try {
    const users = await Car.findAll();

    res.status(200).json({
      status: "Success",
      data: {
        users,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const findCarByStatus = async (req, res, next) => {
  const { status } = req.params;

  try {
    if (status === "available" || status === "not-available") {
      const fixStatus = status === "available" ? "Available" : "Not Available";
      const car = await Car.findAll({
        where: {
          status: fixStatus,
        },
      });

      res.status(200).json({
        status: "Success",
        data: {
          car,
        },
      });
    } else {
      next(
        new ApiError(
          "kesalahan pada parameter, format: '/available' atau '/not-available'",
          400
        )
      );
    }
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const updateCar = async (req, res, next) => {
  const { name, price, status } = req.body;
  try {
    const whoAccess = req.user.name;
    const car = await Car.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!car) {
      return next(new ApiError("Car id tersebut tidak ada", 404));
    }

    if (car.status) {
      if (car.status === "Available" || car.status === "Not Available") {
        await Car.update(
          {
            name,
            price,
            status,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        );

        res.status(200).json({
          status: "Success",
          message: "sukses update car",
        });
      } else {
        return next(
          new ApiError(
            "kesalahan pada status, format: 'Available' atau 'Not Available'",
            400
          )
        );
      }
    }
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const deleteCar = async (req, res, next) => {
  try {
    const car = await Car.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!car) {
      return next(new ApiError("Car id tersebut tidak ada", 404));
    }

    await Car.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "sukses delete car",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

module.exports = {
  createCar,
  findCars,
  findCarByStatus,
  updateCar,
  deleteCar,
};
