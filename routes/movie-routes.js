const movieController = require("../controllers/movie-controller");
const express = require("express");
const auth = require("../auth");
const movieValidation = require("../validation/movie-validation")
const router = express.Router();

const { createMovie, getMovieById, getAllMovies, updateMovie, deleteMovie, paginationMovie } =
  movieController;


// CREATE MOVIE
router.post("/", [auth, movieValidation.checkData], createMovie);

// GET MOVIE BY ID
router.get("/:id", getMovieById);

// GET ALL MOVIES
router.get("/", getAllMovies);

// UPDATE MOVIE
router.put("/:id", [auth, movieValidation.checkData], updateMovie);
// Cũng có thể sử dụng PATCH

// DELETE MOVIE
router.delete("/:id", auth, deleteMovie);

// PAGINATION
router.get("/page/:page", paginationMovie)

module.exports = router;
