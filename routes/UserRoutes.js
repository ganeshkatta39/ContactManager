const express = require("express");
const router = express.Router();

const {
  getUser,
  addUser,
  loginUser,
  test,
} = require("../controllers/UserController");
const validateToken = require("../middleware/validateTokenHandler.js");

router.get("/test", test);
router.get("/current", validateToken, getUser);
router.post("/register", addUser);
router.post("/login", loginUser);

module.exports = router;
