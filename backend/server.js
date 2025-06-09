const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./models");

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Sync DB
db.sequelize.sync()
  .then(() => console.log("Database connected."))
  .catch((err) => console.error("Database connection failed:", err));

const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
