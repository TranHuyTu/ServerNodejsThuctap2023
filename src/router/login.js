const express = require("express");
const router = express.Router();

const moviesController = require("../app/controller/login.controller");

router.post("/", moviesController.Login);
router.post("/decoded", moviesController.Decoded);
router.post("/register", moviesController.Register);
router.put("/update/:id", moviesController.UpdateUser);

module.exports = router;
