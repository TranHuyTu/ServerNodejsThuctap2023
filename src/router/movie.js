const express = require("express");
const router = express.Router();

const moviesController = require("../app/controller/movie.controller");

router.get("/api", moviesController.listMovie);
router.get("/search/:content", moviesController.Search);
router.get("/", moviesController.Show);
router.get("/:id", moviesController.movieDetail);

module.exports = router;
