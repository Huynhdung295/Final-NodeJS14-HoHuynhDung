const { validationResult } = require("express-validator");
const User = require("../models/user-model");
const ObjectId = require("mongoose").Types.ObjectId;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 1) Đăng kí tài khoản user
const register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).json("check your data");

  const { taiKhoan, password, email, phone, hoTen } = req.body;
  let existingUser = await User.findOne({ email: email });
  if (existingUser) return res.status(400).json("Email đã tồn tại");

  let existingAccount = await User.findOne({ taiKhoan: taiKhoan });
  if (existingAccount) return res.status(400).json("Tài khoản đã tồn tại");

  let hashedPassword = await bcrypt.hash(password, 12);

  const createdUser = new User({
    taiKhoan,
    password: hashedPassword,
    email,
    phone,
    hoTen,
  });

  try {
    await createdUser.save();
  } catch (err) {}

  let token;
  token = jwt.sign(
    { userId: createdUser.id, email: createdUser.email },
    "supersecretkey",
    { expiresIn: "1h" }
  );
  res.status(201).json({ token: token, userId: createdUser.id });
};
// Tạo tài khoản
const createUser = async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).json("check your data");
  const { taiKhoan, password, email, phone, maNhom, type, hoTen, creator } =
  req.body;
 
  let existingUser = await User.findOne({ email: email });
  if (existingUser) return res.status(400).json("Email đã tồn tại");

  let existingAccount = await User.findOne({ taiKhoan: taiKhoan });
  if (existingAccount) return res.status(400).json("Tài khoản đã tồn tại");

  let hashedPassword = await bcrypt.hash(password, 12);

  const createdUser = new User({
    taiKhoan,
    password: hashedPassword,
    email,
    phone,
    maNhom,
    type,
    hoTen,
    creator,
  });
  try {
    await createdUser.save();
  } catch (err) {}

  res.status(201).json({  user: createdUser });
};
// 2) Đăng nhập tài khoản
const login = async (req, res) => {
  const { email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {}

  if (!existingUser) return res.status(200).json("Sai thông tin đăng nhập!");

  let isValidPassword = await bcrypt.compare(password, existingUser.password);

  if (!isValidPassword)
    return res.status(400).json("Mật khẩu sai, không thể đăng nhập");

  const token = jwt.sign(
    { userId: existingUser.id, email: existingUser.email },
    "supersecretkey",
    { expiresIn: "1h" }
  );

  res.status(200).json({
    token: token,
    userId: existingUser.id,
    existingUser: existingUser,
  });
};
// 3) Lấy danh sách tài khoản
const getListUser = async (req, res) => {
  try {
    const user = await User.find();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};
// 4 Lấy danh sách theo loại người dùng
const getUserType = async (req, res) => {
  let type = req.params.type;
  try {
    const users = await User.find({
      type: type,
    });
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};
// 5) Panigation user
const paginationUser = async (req, res) => {
  const page = req.params.page || 1;
  const { perPage } = req.body || 20;
  try {
    const users = await User.find()
      .skip(perPage * page - perPage)
      .limit(perPage);
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};
// Search user
const searchUser = async (req, res) => {
  const tuKhoa = req.params.tuKhoa;
  try {
    const users = await User.find(
      {
        $or: [
          { hoTen: new RegExp(tuKhoa) },
          { taiKhoan: new RegExp(tuKhoa) },
          { type: new RegExp(tuKhoa) },
          { maNhom: new RegExp(tuKhoa) },
          { phone: new RegExp(tuKhoa) },
          { email: new RegExp(tuKhoa) },
        ],
      },
      { password: 0 }
    );
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: "Không tìm thấy" });
  }
};
// Search page user
const searchPagaUser = async (req, res) => {
  const tuKhoa = req.params.tuKhoa;
  const page = req.params.page || 1;
  const { perPage } = req.body || 20;
  try {
    const users = await User.find(
      {
        $or: [
          { hoTen: new RegExp(tuKhoa) },
          { taiKhoan: new RegExp(tuKhoa) },
          { type: new RegExp(tuKhoa) },
          { maNhom: new RegExp(tuKhoa) },
          { phone: new RegExp(tuKhoa) },
          { email: new RegExp(tuKhoa) },
        ],
      },
      { password: 0 }
    )
      .skip(perPage * page - perPage)
      .limit(perPage);
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: "Không tìm thấy" });
  }
};
// Xóa người dùng
const deleteUser = async (req, res) => {
  const userID = req.params.userID;
  if (!ObjectId.isValid(userID))
    return res.status(400).json({ error: "ID không tồn tại" });

  try {
    const user = await User.findById(userID);
    if (!user) return res.status(404).json({ message: "ID không tồn tại" });

    await user.remove();
    res.status(200).json({ message: "Xóa thành công" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server error" });
  }
};
// Thông tin tài khoản
const getUserByID = async (req, res) => {
  const userID = req.params.userID;
  if (!ObjectId.isValid(userID))
    return res.status(400).json({ error: "ID không hợp lệ" });

  try {
    const user = await User.findById(userID);
    if (!user)
      return res.status(404).json("Không có tài khoản nào thuộc ID bạn tìm!");
    console.log(user.password);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Update tài khoản
const updateUser = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  const { maNhom, type, phone, hoTen, password } = req.body;
  let hashedPassword = await bcrypt.hash(password, 12);
  const userID = req.params.userID;

  try {
    const user = await User.findById(userID);
    if (!user) return res.status(404).json({ message: "user not found." });

   const update = await user.updateOne(
      {
        maNhom,
        type,
        phone,
        hoTen,
        password: hashedPassword
      },
      {
        timestamps: { createdAt: false, updatedAt: true },
      }
    );

    try {
      await update.save();
    } catch (err) {}

    return res.status(200).json(update);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "server error" });
  }
  
};


module.exports = {
  register,
  login,
  getListUser,
  getUserType,
  paginationUser,
  searchUser,
  updateUser,
  searchPagaUser,
  deleteUser,
  getUserByID,
  createUser,
};
