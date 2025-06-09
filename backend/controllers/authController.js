const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const repo = require("../repository/authRepository");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    let data = { username, password: hashedPassword };
    let user = await repo.createUser(data);
    const existingUser = await repo.getUserByUsername({ where: { username } });
    if (existingUser) {
       return res.status(400).send({ success: false, message: "Username already taken." });
    }

    res.status(200).send({
      success: true,
      message: "User registered successfully",
      data: { id: user.id, username: user.username }
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Registration failed.",
      error: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    let condition = { where: { username } };
    let user = await repo.getUserByUsername(condition);

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Invalid credentials"
      });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).send({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).send({
      success: true,
      message: "Login successful",
      token
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Login failed.",
      error: error.message
    });
  }
};
