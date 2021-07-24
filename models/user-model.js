const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  taiKhoan: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  email: { type: String, required: true, unique: true },
  phone: {type: String, required: true},
  maNhom: {type: String, default: "MEMBER"},
  type: {type: String, default: "USER"},
  hoTen: {type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);