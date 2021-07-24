const { check } = require("express-validator");

const checkData = [
    check("title").not().isEmpty(),
    check("description").not().isEmpty(),
    check("creator").not().isEmpty(),
    check("biDanh").not().isEmpty(),
    check("trailer").not().isEmpty(),
    check("hinhAnh").not().isEmpty(),
    check("maNhom").not().isEmpty(),
    check("ngayKhoiChieu").not().isEmpty()
  ];

  module.exports = {checkData}