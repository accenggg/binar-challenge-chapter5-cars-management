const router = require("express").Router();

const User = require("../controller/userController");

const autentikasi = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");

router.post("/", autentikasi, checkRole("Superadmin"), User.createUser);
router.get("/", autentikasi, checkRole("Superadmin"), User.findUsers);
router.get("/:id", autentikasi, checkRole("Superadmin"), User.findUserById);
router.patch("/:id", autentikasi, checkRole("Superadmin"), User.updateUser);
router.delete("/:id", autentikasi, checkRole("Superadmin"), User.deleteUser);

module.exports = router;
