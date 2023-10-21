const router = require("express").Router();

const Auth = require("./authRouter");
const User = require("./userRouter");
const Car = require("./carRouter");
const TraceCar = require("./traceCarRouter");

router.use("/api/v1/auth", Auth);
router.use("/api/v1/users", User);
router.use("/api/v1/cars", Car);
router.use("/api/v1/trace", TraceCar);

module.exports = router;
