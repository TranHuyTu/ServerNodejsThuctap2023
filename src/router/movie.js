const express = require("express");
const router = express.Router();

const moviesController = require("../app/controller/movie.controller");

router.post("/api", moviesController.listMovie);
router.get("/search/", moviesController.Show);
router.get("/search/:content", moviesController.Search);
router.get("/:id", moviesController.movieDetail);
router.post("/api/add", moviesController.createNewMovie);
router.put("/api/update/:id", moviesController.updateOneMovieById);
router.delete("/api/delete/:id", moviesController.deleteOneMovieById);
router.get("/", moviesController.Show);

module.exports = router;
