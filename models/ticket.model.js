const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ticketSchema = new Schema(
  {
    maGhe: { type: String, required: true },
    giaVe: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);
