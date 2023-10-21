const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Auth, User } = require("../models");
const ApiError = require("../utils/apiError");

const register = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword, age, address } = req.body;

    // validasi untuk check apakah email nya udah ada
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
      return next(new ApiError("minimal password berisi 8 karakter", 400));
    }

    // minimum password length
    if (password !== confirmPassword) {
      return next(new ApiError("password tidak sesuai", 400));
    }

    // hashing password
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const hashedConfirmPassword = bcrypt.hashSync(confirmPassword, saltRounds);

    const newUser = await User.create({
      name,
      age,
      role: "Member",
      address,
      carsId: [],
    });

    const newAuth = await Auth.create({
      email,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
      userId: newUser.id,
    });

    console.log(newAuth);

    res.status(201).json({
      status: "Success",
      data: {
        ...newUser,
        email,
        password: hashedPassword,
        confirmPassword: hashedConfirmPassword,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Auth.findOne({
      where: {
        email,
      },
      include: ["User"],
    });

    if (user && bcrypt.compareSync(password, user.password)) {
      //   token utk autentikasi
      const token = jwt.sign(
        {
          id: user.userId,
          email: user.email,
          name: user.User.name,
          role: user.User.role,
        },
        process.env.JWT_SECRET
      );

      res.status(200).json({
        status: "Success",
        message: "Berhasil login",
        data: token,
      });
    } else {
      next(new ApiError("password salah atau user tidak ada", 400));
    }
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const authenticate = async (req, res) => {
  try {
    res.status(200).json({
      status: "Success",
      data: {
        user: req.user,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  register,
  login,
  authenticate,
};
