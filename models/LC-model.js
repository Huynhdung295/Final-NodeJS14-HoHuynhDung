const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LCSchema = new Schema(
  {
    maRap: { type: String, required: true },
    giaVe: { type: String, required: true },
    maPhim: { type: String, require: true },
    ngayGioKhoiChieu: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LichChieu", LCSchema);
