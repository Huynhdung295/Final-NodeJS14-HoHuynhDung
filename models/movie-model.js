const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    creator: { type: String, required: true },
    biDanh: { type: String, required: true },
    trailer: { type: String, required: true },
    hinhAnh: { type: String, required: false },
    maNhom: { type: String, required: true },
    ngayKhoiChieu: { type: String, required: true },
    danhGia: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", userSchema);
