const express = require("express");
const router = express.Router();

const siteController = require("../app/controller/site.controller");

router.get("/", siteController.index);

module.exports = router;
