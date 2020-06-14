const User = require("../models/user");
const _ = require("lodash");
const formidable = require("formidable");
const fs = require("fs");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  return res.json(req.profile);
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtension = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded",
      });
    }
    let user = req.profile;
    user = _.extend(user, fields);

    if (fields.password && fields.password.length < 6) {
      return res.status(400).json({
        error: "Password should be min 6 characters long",
      });
    }

    if (files.photo) {
      if (files.photo.size > 10000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb",
        });
      }
      user.photo.data = fs.readFileSync(files.photo.path);
      user.photo.contentType = files.photo.type;
    }

    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: "All filds required",
        });
      }
      user.hashed_password = undefined;
      res.json(user);
    });
  });
};

exports.photo = (req, res) => {
  const shortid = req.params.shortid;
  User.findOne({ shortid }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    if (user.photo.data) {
      res.set("Content-Type", user.photo.contentType);
      return res.send(user.photo.data);
    }
  });
};
