const controller = require("./controller");
const express = require("express");
const router = express.Router();

router.get("/",
controller.loadPage.bind(controller));

router.post("/",
controller.logout.bind(controller)
)

module.exports = router;

