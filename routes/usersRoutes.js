const express = require("express");
const router = express.Router();
const {
  updateUser,
  getAllUsers,
  login,
  register,
} = require("../controllers/usersControllers");

router.post("/login", login);

router.post("/register", register);

router.put("/user/:id", updateUser);

router.get("/getallusers", getAllUsers);

module.exports = router;
