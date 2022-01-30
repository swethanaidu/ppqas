// import the model
const User = require("../Models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const { jwtSecret } = config;

// export the controller functionalities

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
      },
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
   
};

exports.signup = async (req, res) => {
  const { email, password, firstName, lastName, role, totalExp, company, doj } = req.body;
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
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw Error("Something went wrong saving the user");

    const token = jwt.sign({ id: savedUser._id }, jwtSecret, {
      expiresIn: 3600,
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
      },
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
