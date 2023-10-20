const router = require("express").Router();

const Admin = require("./adminRouter");
const Auth = require("./authRouter");
const User = require("./userRouter");

router.use("/api/v1/auth", Auth);
router.use("/api/v1/users", User);

router.use("/", Admin);

module.exports = router;
