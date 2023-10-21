const ApiError = require("../utils/apiError");

const checkRole = (...roles) => {
  return async (req, res, next) => {
    try {
      console.log(req.user.role);

      if (!roles.includes(req.user.role)) {
        return next(
          new ApiError(`Akses ini hanya untuk role: ${roles.join(", ")}`, 401)
        );
      }

      next();
    } catch (err) {
      next(new ApiError(err.message, 500));
    }
  };
};

module.exports = checkRole;
