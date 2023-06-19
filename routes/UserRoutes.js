const express = require("express");
const router = express.Router();

const {
  getUser,
  addUser,
  loginUser,
} = require("../controllers/UserController");
const validateToken = require("../middleware/validateTokenHandler.js");

router.get("/current", validateToken, getUser);
router.post("/register", addUser);
router.post("/login", loginUser);

module.exports = router;
