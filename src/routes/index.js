const express = require("express");
const router = express.Router();
const loginRouter = require("./login")
const registerRouter = require("./register")
const homeRouter = require("./home")


router.use('/login',loginRouter);
router.use('/register',registerRouter);
router.use('/home',homeRouter);
router.use('/',homeRouter);



module.exports = router;