const { check } = require("express-validator");

const checkData = [
    check("title").not().isEmpty(),
    check("description").not().isEmpty(),
    check("creator").not().isEmpty(),
  ];

  module.exports = {checkData}