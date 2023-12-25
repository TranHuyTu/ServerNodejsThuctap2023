const express = require("express");
const router = express.Router();

const TickerController = require("../app/controller/ticker.controller");

router.post("/addTicker", TickerController.createNewTicker);
router.put("/update/:id", TickerController.updateOneTickerById);
router.delete("/delete/:id", TickerController.deleteOneTickerById);
router.post("/:id", TickerController.TickerDetail);
router.get("/", TickerController.TickerAll);

module.exports = router;
