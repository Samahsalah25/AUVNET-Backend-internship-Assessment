const express = require("express");
const router = express.Router();
const { register ,loginUser  ,logoutUser} = require("../controllers/authController");

// Register Route
router.post("/register", register);
router.post("/login", loginUser);
router.post("/logout",logoutUser );
module.exports = router;
