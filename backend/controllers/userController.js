import { __prod__, __secret__ } from '../config/constants.js';
import asyncHanlder from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth User and get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHanlder(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error(`Invalid email or password`);
  }
});

// @desc    Register a user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHanlder(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error(`User already exists`);
  }
  const user = await User.create({ name, email, password });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error(`Invalid user data`);
  }
});

// @desc    Logout user and clear the server cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHanlder((req, res) => {
  res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: 'Logged out successfully' });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHanlder((req, res) => {
  res.send('Get user profile');
});

// @desc    Update user profile based on user token
// @route   UPDATE /api/users/profile
// @access  Private
const updateUserProfile = asyncHanlder((req, res) => {
  res.send('Update profile');
});

// @desc    Get all users
// @route   GET /api/users/
// @access  Private/Admin
const getUsers = asyncHanlder((req, res) => {
  res.send('get all users ');
});

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHanlder((req, res) => {
  res.send('get a user by id ');
});

// @desc    Update a user by id
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHanlder((req, res) => {
  res.send('Update user ');
});

// @desc    Delete a user by id
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHanlder((req, res) => {
  res.send('Delete user ');
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
