const { TraceCar } = require("../models");
const ApiError = require("../utils/apiError");
const findTraceCars = async (req, res, next) => {
  try {
    const traceCar = await TraceCar.findAll({ include: ["Car"] });

    res.status(200).json({
      status: "Success",
      data: {
        traceCar,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  findTraceCars,
};
