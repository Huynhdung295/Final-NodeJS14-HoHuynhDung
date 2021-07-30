const { check } = require("express-validator");

const checkDataUser = [
    check("taiKhoan").not().isEmpty(),
    check("password").isLength({ min: 6 }).not().isEmpty(),
    check("email").normalizeEmail().isEmail().not().isEmpty(),
    check("phone").isMobilePhone().not().isEmpty(),
    check("maNhom").not().isEmpty(),
    check("type").not().isEmpty(),
    check("hoTen").not().isEmpty(),
    check("creator").not().isEmpty()
  ];

  module.exports = {checkDataUser}