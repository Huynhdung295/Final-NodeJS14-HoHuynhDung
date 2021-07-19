const { validationResult } = require("express-validator");
const ObjectId = require("mongoose").Types.ObjectId;
const User = require("../models/user-model");
const Movie = require("../models/movie-model");

// CREATE MOVIE
const createMovie = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const {
    title,
    description,
    creator,
    biDanh,
    trailer,
    hinhAnh,
    maNhom,
    ngayKhoiChieu,
    danhGia,
  } = req.body;
  let existingUser = await User.findOne({ _id: creator });
  if (!existingUser)
    return res.status(400).json({ error: "Người dùng không hợp lệ" });

  const movie = new Movie({
    title,
    description,
    creator,
    biDanh,
    trailer,
    hinhAnh,
    maNhom,
    ngayKhoiChieu,
    danhGia,
  });

  try {
    await movie.save();
    res.status(200).json({
      message: "Thêm phim thành công",
      movie: movie,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// GET MOVIE BY ID
const getMovieById = async (req, res) => {
  const movieId = req.params.id;
  if (!ObjectId.isValid(movieId))
    return res.status(400).json({ error: "ID không hợp lệ" });

  try {
    const movie = await Movie.findById(movieId);
    if (!movie)
      return res.status(404).json("Không có phim nào thuộc ID bạn tìm!");
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL MOVIES
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};

// UPDATE MOVIE
const updateMovie = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const {
    title,
    description,
    creator,
    biDanh,
    trailer,
    hinhAnh,
    maNhom,
    ngayKhoiChieu,
    danhGia,
  } = req.body;
  const movieId = req.params.id;
  if (!ObjectId.isValid(movieId))
    return res.status(400).json({ error: "Invalid id" });

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: "movie not found." });
    await movie.updateOne({
      title,
      description,
      creator,
      biDanh,
      trailer,
      hinhAnh,
      maNhom,
      ngayKhoiChieu,
      danhGia,
    });
    return res.status(200).json(movie);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "server error" });
  }
};

// DELETE MOVIE
const deleteMovie = async (req, res) => {
  const movieId = req.params.id;
  if (!ObjectId.isValid(movieId))
    return res.status(400).json({ error: "Invalid id" });

  try {
    const movie = await Movie.findById(movieId);
    if (!movie)
      return res
        .status(404)
        .json({ message: "there is no movie with this id." });

    await movie.remove();
    res.status(200).json({ message: "movie removed" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "server error" });
  }
};

// PANIGATION MOVIE
const paginationMovie = async (req, res) => {
  let page = req.params.page || 1;
  let perPage = 20;
  try {
    const movies = await Movie.find()
      .skip(perPage * page - perPage)
      .limit(perPage);
    return res.status(200).json(movies);
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};

module.exports = {
  createMovie,
  getMovieById,
  getAllMovies,
  updateMovie,
  deleteMovie,
  paginationMovie,
};
