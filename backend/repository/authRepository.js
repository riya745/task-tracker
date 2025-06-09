"use strict";
const db = require("../models");
const User = db.User;

const authRepository = () => {
  const getUserByUsername = condition => {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await User.findOne(condition);
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  };

  const createUser = data => {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await User.create(data);
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  };

  return { getUserByUsername, createUser };
};

module.exports = authRepository();
