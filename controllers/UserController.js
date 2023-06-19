const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
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

  //hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({ username: user.username, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data not valid");
  }
});

//@desc Add a user
//@route Post /api/user/register
//@acess public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("all the fields are mandatory");
  }
  const user = await User.findOne({ email });
  if (user && bcrypt.compare(password, user.password)) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.SECRET,
      { expiresIn: "120m" }
    );

    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("password and email do not match");
  }
});

module.exports = { addUser, getUser, loginUser };
