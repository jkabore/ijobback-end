const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const oldUser = await User.findOne({
      username: username.toLowerCase(),
    });

    if (oldUser) {
      return res.status(404).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newuser = await new User({
      username: username.toLowerCase(),
      password: hashedPassword,
    });

    await newuser.save();
    res.send("User Created Successfully");
  } catch (error) {
    console.log(error.message);
    return res.status(400).json(error.message);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      username: username.toLowerCase(),
    });
    if (!user) {
      return res.status(404).json({ message: "User does not exist!" });
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    const token = await jwt.sign(
      {
        username: user.userName,
        id: user._id,
      },
      process.env.SECRET,
      {
        expiresIn: "8h",
      }
    );

    res.json({ token, user });
  } catch (error) {
    console.log("Error", error);
    return res.status(400).json(error);
  }
};

const updateUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);

    const user = await User.findOne({ _id: req.params.id });

    res.send(user);
  } catch (error) {
    console.log("Error", error);
    return res.status(400).json({ error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
  
    res.send(users);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = {
  updateUser,
  getAllUsers,
  login,
  register,
};
