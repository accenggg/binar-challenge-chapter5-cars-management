const { User, Auth } = require("../models");
const ApiError = require("../utils/apiError");
const toPascalCase = require("../lib/pascalCase");
const { array } = require("../middlewares/uploader");
const bcrypt = require("bcrypt");

const createUser = async (req, res, next) => {
  const { name, email, password, confirmPassword, age, address, role } =
    req.body;

  try {
    const fixRole = toPascalCase(role);
    const user = await Auth.findOne({
      where: {
        email,
      },
    });

    if (user) {
      return next(new ApiError("email telah digunakan!", 400));
    }

    // minimum password length
    const passwordLength = password <= 8;
    if (passwordLength) {
      return next(new ApiError("minimal password 8 karakter", 400));
    }

    // minimum password length
    if (password !== confirmPassword) {
      return next(new ApiError("password tidak sesuai", 400));
    }

    // hashing password
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const hashedConfirmPassword = bcrypt.hashSync(confirmPassword, saltRounds);

    if (fixRole === "Admin" || fixRole === "Member") {
      // if (typeof carsId != "object") {
      //   return next(new ApiError("masukkan data cardId kedalam Array '[]'"));
      // }

      const newUser = await User.create({
        name,
        age,
        role: fixRole,
        address,
        carsId: [],
      });

      const auth = await Auth.create({
        email,
        password: hashedPassword,
        confirmPassword: hashedConfirmPassword,
        userId: newUser.id,
      });

      res.status(201).json({
        status: "Success",
        data: {
          ...newUser,
          email,
          password: hashedPassword,
          confirmPassword: hashedConfirmPassword,
        },
      });
    } else {
      next(
        new ApiError("role hanya bisa diisi dengan 'Admin' atau 'Member'", 400)
      );
    }
  } catch (err) {
    next(new ApiError(err.message, 500));
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
    next(new ApiError(err.message, 500));
  }
};

const findUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!user) {
      return next(new ApiError("User id tersebut tidak ada", 404));
    }

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

    if (!user) {
      return next(new ApiError("User id tersebut tidak ada", 404));
    }

    if (carsId) {
      if (typeof carsId != "object") {
        return next(new ApiError("masukkan data cardId kedalam Array ([])"));
      }
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
      return next(new ApiError("User id tersebut gak ada", 404));
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
