// import the model
const User = require("../Models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const { jwtSecret } = config;

// export the controller functionalities
// @route GET /userLogin
// @desc  Login
// @access Public

exports.login = async (req, res) => {
  const { email, password } = req.body;
  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    // Check for existing user
    const user = await User.findOne({ email });
    if (!user) throw Error("User does not exist");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error("Invalid credentials");

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: 3600 });
    if (!token) throw Error("Couldnt sign the token");

    res.status(200).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        email: user.email,
        role: user.role,
        totalExp: user.totalExp,
        company: user.company,
        doj: user.doj,
        yop: user.yop,
      },
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
// @route POST /signup
// @desc  registeration
// @access Public

exports.signup = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    role,
    totalExp,
    company,
    doj,
    yop,
  } = req.body;
  // Simple validation
  if (!email || !password || !firstName || !lastName || !role || !totalExp) {
    return res.status(400).json({ message: "Please enter (*)required fields" });
  }

  try {
    const user = await User.findOne({ email });
    if (user) throw Error("User already exists");

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("Something went wrong with bcrypt");

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error("Something went wrong hashing the password");

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hash,
      role,
      totalExp,
      company,
      doj,
      yop,
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw Error("Something went wrong saving the user");

    const token = jwt.sign({ id: savedUser._id }, jwtSecret, {
      expiresIn: 200,
    });

    res.status(200).json({
      token,
      user: {
        id: savedUser.id,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.email,
        role: savedUser.role,
        totalExp: savedUser.totalExp,
        company: savedUser.company,
        doj: savedUser.doj,
        yop: savedUser.yop,
      },
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// @route GET /getUser
// @desc Get one User by id
// @access Public

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) throw Error("User does not exist");
    res.json(user);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// @route GET /getUser
// @desc Get all User
// @access Public

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    if (!users) throw Error("No users");

    res.status(200).json(users);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

// @route GET /getJuniors
// @desc Get all User
// @access Public

exports.getJuniors = async (req, res) => {
  try {
    const users = await User.find({ role: "JR" });
    if (!users) throw Error("No users");

    res.status(200).json(users);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

// @route GET /user/:id
// @desc Get User by
// @access Public

exports.getUSerByID = async (req, res) => {
  try {
    const users = await User.find({ _id: req.params.id });
    if (!users) throw Error("No users");

    res.status(200).json(users);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

// @route POST /addUser
// @desc add new USer
// @access Private

exports.addJr = async (req, res) => {
  const { email, firstName, lastName, role, totalExp, company, doj, yop } =
    req.body;
  const password = email;
  // Simple validation
  if (!email || !password || !firstName || !lastName || !role || !totalExp) {
    return res.status(400).json({ message: "Please enter (*)required fields" });
  }

  try {
    const user = await User.findOne({ email });
    if (user) throw Error("User already exists");

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("Something went wrong with bcrypt");

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error("Something went wrong hashing the password");

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hash,
      role,
      totalExp,
      company,
      doj,
      yop,
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw Error("Something went wrong saving the user");
    res.status(200).json(savedUser);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// @route DELETE /deleteUser/:id
// @desc delete  User
// @access Private

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw Error("No user found");

    const removed = await user.remove();
    if (!removed)
      throw Error("Something went wrong while trying to delete the user");

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
};

// @route DELETE /deleteUser/:id
// @desc delete  User
// @access Private

exports.convertToSr = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw Error("No user found");

    const removed = await user.update({ role: "SR" });
    if (!removed)
      throw Error("Something went wrong while trying to update the user");

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
};
