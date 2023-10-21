const router = require("express").Router();
const TraceCar = require("../controller/traceCarController");

const autentikasi = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");

router.get(
  "/",
  autentikasi,
  checkRole("Superadmin", "Admin"),
  TraceCar.findTraceCars
);

module.exports = router;
