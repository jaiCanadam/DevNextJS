const express = require("express");
const router = express.Router();
const {
  requireSignin,
  authMiddleware,
  adminMiddleware,
} = require("../controllers/auth");
const { read, publicProfile, update, photo } = require("../controllers/user");

router.get("/profile", requireSignin, authMiddleware, read);
router.put("/user/update", requireSignin, authMiddleware, update);
router.get("/user/photo/:shortid", photo);
//router.get("/secret", requireSignin, adminMiddleware, read);

module.exports = router;
