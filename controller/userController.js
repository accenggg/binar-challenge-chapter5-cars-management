const { User } = require("../models");
const ApiError = require("../utils/apiError");
const toPascalCase = require("../lib/pascalCase");
const { array } = require("../middlewares/uploader");

const createUser = async (req, res, next) => {
  const { name, age, role, address, carsId } = req.body;

  const fixRole = toPascalCase(role);

  console.log(fixRole);

  try {
    if (fixRole === "Admin" || fixRole === "Member") {
      const user = await User.create({
        name,
        age,
        role: fixRole,
        address,
        carsId: carsId,
      });

      res.status(201).json({
        status: "Success",
        data: {
          user,
        },
      });
    } else {
      res.status(400).json({
        message: "Role hanya bisa diisi dengan 'Admin' atau 'Member'",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const findUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();

    res.status(200).json({
      status: "Success",
      data: {
        users,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const findUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const updateUser = async (req, res, next) => {
  const { name, age, role, address, carsId } = req.body;
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (typeof carsId != "object") {
      next(new ApiError("masukkan data cardId kedalam Array ([])"));
    }

    if (!user) {
      next(new ApiError("User id tersebut gak ada", 404));
    }

    await User.update(
      {
        name,
        age,
        role,
        address,
        carsId,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({
      status: "Success",
      message: "sukses update user",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!user) {
      next(new ApiError("User id tersebut gak ada", 404));
    }

    await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "sukses delete user",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

module.exports = {
  createUser,
  findUsers,
  findUserById,
  updateUser,
  deleteUser,
};
