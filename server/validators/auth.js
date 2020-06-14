const { check } = require("express-validator");

exports.userSignupValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),

  check("email")
    .not()
    .isEmpty()
    .withMessage("Please enter your email address")
    .isEmail()
    .withMessage("Must be a valid email address"),

  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  check("phone")
    .isLength({ min: 10, max: 10 })
    .withMessage("Please enter a valid Phone Number")
    .isNumeric()
    .withMessage("Phone number is invaild"),
];

exports.userSigninValidator = [
  check("email")
    .isEmail()
    .withMessage("Must be a valid email address")
    .not()
    .isEmpty()
    .withMessage("Please enter your email address"),

  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
