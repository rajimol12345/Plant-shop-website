const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken.js');
const User = require('../models/userModel.js');
const Admin = require('../models/adminModel.js');

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Try finding in Admin collection first
  let user = await Admin.findOne({ email });
  let isAdmin = true;

  if (!user) {
    // If not in Admin, try User collection
    user = await User.findOne({ email });
    isAdmin = false;
  }

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      image: user.image,
      token: generateToken(user._id),
    });
  } else {
    console.log('Login failed: Invalid credentials or user not found');
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  const userExists = await User.findOne({ email }) || await Admin.findOne({ email });

  if (userExists) {
    console.log('User already exists');
    res.status(400);
    throw new Error('User already exists');
  }

  let user;
  if (isAdmin) {
    user = await Admin.create({
      name,
      email,
      password,
      isAdmin: true,
    });
  } else {
    user = await User.create({
      name,
      email,
      password,
      isAdmin: false,
    });
  }

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      image: user.image,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  let user = await User.findById(req.user._id);
  if (!user) {
    user = await Admin.findById(req.user._id);
  }

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      image: user.image,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  let user = await User.findById(req.user._id);
  let Model = User;

  if (!user) {
    user = await Admin.findById(req.user._id);
    Model = Admin;
  }

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.image = req.body.image || user.image;
    if (req.body.password) {
      user.password = req.body.password;
    }

    try {
      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        image: updatedUser.image,
        token: generateToken(updatedUser._id),
      });
    } catch (error) {
      console.error('Update Profile Error:', error);
      res.status(500);
      throw new Error('Update failed: ' + error.message);
    }
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  const admins = await Admin.find({});
  res.json([...users, ...admins]);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error('Cannot delete admin user from customers list');
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: 'User removed' });
  } else {
    // Check if it's an admin just in case
    const admin = await Admin.findById(req.params.id);
    if (admin) {
      res.status(400);
      throw new Error('Cannot delete admin user');
    }
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    const admin = await Admin.findById(req.params.id).select('-password');
    if (admin) {
      res.json(admin);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  let user = await User.findById(req.params.id);
  let Model = User;

  if (!user) {
    user = await Admin.findById(req.params.id);
    Model = Admin;
  }

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
