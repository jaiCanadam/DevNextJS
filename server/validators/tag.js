const { check } = require("express-validator");

exports.createTagValidator = [
  check("name").not().isEmpty().withMessage(" Tag Name is required"),
];
