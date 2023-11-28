const express = require("express");
const router = express.Router();

const moviesController = require("../app/controller/movie.controller");

router.get("/api", moviesController.listMovie);
router.get("/search/", moviesController.Show);
router.get("/search/:content", moviesController.Search);
router.get("/:id", moviesController.movieDetail);
router.get("/", moviesController.Show);

module.exports = router;
