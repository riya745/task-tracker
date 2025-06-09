"use strict";
const fs = require("fs");
const Sequelize = require("sequelize");
const path = require("path");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    define: {
      timestamps: false
    }
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load Models
db.User = require("./user.model")(sequelize, Sequelize);
db.Task = require("./task.model")(sequelize, Sequelize);

// Associations
db.User.hasMany(db.Task, { foreignKey: "user_id" });
db.Task.belongsTo(db.User, { foreignKey: "user_id" });

module.exports = db;
