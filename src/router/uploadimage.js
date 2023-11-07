const express = require("express");
const router = express.Router();
var uploadCloud = require("../app/config/cloundinary.config");
var uploadController = require("../app/controller/uploadimage.controller");

router.post("/", uploadCloud.single("image"), uploadController.uploadImg);
router.post("/video", uploadController.UploadVideoControllers);
router.post("/pathImg", uploadController.deleteImg);

module.exports = router;
