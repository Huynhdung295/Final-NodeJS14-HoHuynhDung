const { check } = require('express-validator');
const usersController = require('../controllers/user-controller');
const express = require('express');
const auth = require("../auth"); 
const test = require("../phanQuyen")
const router = express.Router();
// Route Đăng kí
router.post(
  "/register",
  [
    check("taiKhoan").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
    check("phone").isMobilePhone(),
    check("hoTen").not().isEmpty()
  ],
  usersController.register
);
// Route Đăng nhập
router.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.login
);


// Route List account
router.get("/list-user", auth, test,usersController.getListUser)
// Route List type
router.get("/list-user/:type",auth,test, usersController.getUserType)
// Route Panigation
router.get("/list-user/page/:page",auth,test, usersController.paginationUser)
// Route Tìm kiếm user
router.get("/list-user/search/:tuKhoa",auth,test, usersController.searchUser)
// Route Tìm kiếm page user
router.get("/list-user/search/:tuKhoa/:page",auth,test, usersController.searchPagaUser)
// Route Xóa user
router.delete("/:userID", auth,test,usersController.deleteUser)
module.exports = router;