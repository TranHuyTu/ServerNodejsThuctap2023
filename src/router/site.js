const express = require("express");
const router = express.Router();

const siteController = require("../app/controller/site.controller");

router.use("/", siteController.index);

module.exports = router;
