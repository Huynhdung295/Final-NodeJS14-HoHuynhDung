const { validationResult } = require("express-validator");
const ObjectId = require("mongoose").Types.ObjectId;
const User = require("../models/user-model");
const Movie = require("../models/movie-model");
const LichChieu = require("../models/LC-model");
const express = require("express");
const ThongTinRap = require("../models/theater");

// Lấy thông tin hệ thống rạp

// Lấy thông tin cụm rạp theo hệ thống

// Lấy thông tin lịch chiếu hệ thống rạp
const getLCByCluster = async (req, res) => {
  const lCID = req.params.id;
  if (!ObjectId.isValid(lCID))
    return res.status(400).json({ error: "ID không hợp lệ" });

  try {
    const lichChieu = await LichChieu.find(
      { maPhim: lCID },
      { _id: 0, maPhim: 0 }
    );
    if (!lichChieu)
      return res.status(404).json("Không có phim nào thuộc ID bạn tìm!");
    res.status(200).json(lichChieu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Lấy thông tin lịch chiếu phim
const getLCById = async (req, res) => {
  const lCID = req.params.id;
  try {
    const lichChieu = await LichChieu.find({ maRap: lCID }, { _id: 0 });
    if (!lichChieu)
      return res.status(404).json("Không có phim nào thuộc ID bạn tìm!");
    res.status(200).json(lichChieu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//
const getTheater = async (req, res) => {
  const theater = await ThongTinRap.find();
  if (!theater) {
    return res.status(500).json({
      message: false,
    });
  }
  res.status(200).send(theater);
};

module.exports = {
  getLCById,
  getLCByCluster,
  getTheater,
};
