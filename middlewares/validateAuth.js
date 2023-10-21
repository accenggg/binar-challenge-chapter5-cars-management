const checkRole = require("./checkRole");

const validateAuth = (role1, role2) => {
  return async (req, res, next) => {
    try {
      if (
        role1 === "Superadmin" ||
        role1 === "Admin" ||
        role2 === "Superadmin" ||
        role2 === "Admin"
      ) {
        checkRole("Superadmin");
      }
    } catch (err) {
      next(new ApiError(err.message, 500));
    }
  };
};

module.exports = checkRole;
