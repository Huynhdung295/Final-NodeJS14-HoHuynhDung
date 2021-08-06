const mongoose = require("mongoose");

const TheaterShema = mongoose.Schema(
  {
    maHeThongRap: { type: String, required: true },
    tenHeThongRap: { type: String, required: true },
    biDanh: { type: String, required: true },
    logo: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rap", TheaterShema);
