const express = require("express");
const router = express.Router();
const controller = require('./controller');
const validator = require("./validator")

router.get('/',
controller.loadPage.bind(controller));

router.post('/',
validator.validation(),
controller.validatioBody.bind(controller),
controller.login.bind(controller)
);

module.exports = router;