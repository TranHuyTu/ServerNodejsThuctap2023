const express = require("express");
const router = express.Router();

const loginController = require("../app/controller/login.controller");

router.get("/form", loginController.Show);
router.post("/decoded", loginController.Decoded);
router.post("/register", loginController.Register);
router.put("/update/:id", loginController.UpdateUser);
router.post("/", loginController.Login);

module.exports = router;
