const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@desc Get all contacts
//@route Get /api/contacts
//@acess public
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById();
  res.status(200).json(user);
});

//@desc Add a user
//@route Post /api/user/register
//@acess public
const addUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("all the fields are mandatory");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(403);
    throw new Error("User already present");
  }
  const user = await User.create({
    username,
    email,
    password,
  });

  res.status(201).json(user);
});

//@desc Add a user
//@route Post /api/user/register
//@acess public
const loginUser = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  console.log({ name, email, phone });
  if (!name || !email || !phone) {
    res.status(404);
    throw new Error("all the fields are mandatory");
  }
  const user = await User.create({
    name,
    email,
    phone,
  });

  res.status(201).json(user);
});

module.exports = {};
