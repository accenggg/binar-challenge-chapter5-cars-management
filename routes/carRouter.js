const router = require("express").Router();

const Car = require("../controller/carController");

const autentikasi = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");

router.post("/", autentikasi, checkRole("Superadmin", "Admin"), Car.createCar);
router.get("/", autentikasi, checkRole("Superadmin", "Admin"), Car.findCars);
router.get("/:status", autentikasi, Car.findCarByStatus);
router.patch(
  "/:id",
  autentikasi,
  checkRole("Superadmin", "Admin"),
  Car.updateCar
);
router.delete(
  "/:id",
  autentikasi,
  checkRole("Superadmin", "Admin"),
  Car.deleteCar
);

module.exports = router;
