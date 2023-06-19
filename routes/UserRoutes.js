const express = require("express");
const router = express.Router();

const {
  getUser,
  addUser,
  loginUser,
} = require("../controllers/UserController");

router.route("/current").get(getUser);
router.route("/register").post(addUser);
router.route("/login").post(loginUser);

module.exports = router;
