const router = require("express").Router();

const User = require("../controller/userController");

const autentikasi = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");

router.post("/", User.createUser);
router.get("/", User.findUsers);
router.get("/:id", User.findUserById);
router.patch("/:id", User.updateUser);
router.delete("/:id", User.deleteUser);

module.exports = router;
