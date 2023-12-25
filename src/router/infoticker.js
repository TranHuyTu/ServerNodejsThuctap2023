const express = require("express");
const router = express.Router();

const infoTickerController = require("../app/controller/infoticker.controller");

router.post("/addInfoTicker", infoTickerController.createNewInfoTicker);
router.put("/update/:id", infoTickerController.updateOneInfoTickerById);
router.delete("/delete/:id", infoTickerController.deleteOneInfoTickerById);
router.post("/:id", infoTickerController.InfoTickerByTicker);
router.get("/", infoTickerController.InfoTickerAll);

module.exports = router;
