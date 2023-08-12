const express = require("express");
const router = express.Router();

const moviesController = require("../app/controller/movie.controller");

router.get("/", moviesController.Show);
router.get("/:id", moviesController.movieDetail);
router.get("/api", moviesController.listMovie);

module.exports = router;
