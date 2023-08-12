const express = require("express");
const router = express.Router();

const siteController = require("../app/controller/site.controller");

router.get("/", siteController.Show);

module.exports = router;
