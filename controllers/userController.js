import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken } from "../utils/helper.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // check for missing fields
  if (!username || !email || !password) {
    res.status(400);
    let missedFields = [];
    if (!email) missedFields.push("email");
    if (!password) missedFields.push("password");
    if (!username) missedFields.push("username");
    throw new Error(`Please add ${missedFields.join(", ")}`);
  }

  // check for existing user using email
  let newEmail = email.toLowerCase();

  const user = await User.findOne({ email: newEmail });

  if (user) {
    res.status(400);
    throw new Error("User already exists with this email");
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create the user
  const newUser = await User.create({
    username,
    email: newEmail,
    password: hashedPassword,
  });

  res.status(201).json({
    message: "User registered successfully",
    user: newUser,
    token: generateToken(newUser._id),
  });
});

const loginUser = asyncHandler(async (req, res) => {
  // check for missing fields
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    let missedFields = [];
    if (!email) missedFields.push("email");
    if (!password) missedFields.push("password");

    throw new Error(`Please add ${missedFields.join(", ")}`);
  }

  // check for existing user using email
  let newEmail = email.toLowerCase();
  const user = await User.findOne({ email: newEmail });

  if (!user) {
    res.status(400);
    throw new Error("User does not exist with this email");
  }

  // check if password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    res.status(400);
    throw new Error("Password is incorrect");
  }

  res.status(200).json({
    message: "User logged in successfully",
    user,
    token: generateToken(user._id),
  });
});

const getUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "User fetched successfully",
    user: {
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    },
  });
});

export { loginUser, registerUser, getUser };
