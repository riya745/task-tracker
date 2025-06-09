const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login requests per windowMs
  message: {
    success: false,
    message: "Too many login attempts. Please try again after 15 minutes."
  }
});

router.post("/register", loginLimiter, authController.register);
router.post("/login", loginLimiter, authController.login);

module.exports = router;
