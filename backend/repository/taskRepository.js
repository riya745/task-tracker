"use strict";
const db = require("../models");
const Task = db.Task;
const { Op } = db.Sequelize;

const taskRepository = () => {
  const getAllTasks = condition => {
    return new Promise(async (resolve, reject) => {
      try {
        let tasks = await Task.findAll(condition);
        resolve(tasks);
      } catch (error) {
        reject(error);
      }
    });
  };

  const createTask = data => {
    return new Promise(async (resolve, reject) => {
      try {
        let task = await Task.create(data);
        resolve(task);
      } catch (error) {
        reject(error);
      }
    });
  };

  const updateTask = (data, condition) => {
    return new Promise(async (resolve, reject) => {
      try {
        let task = await Task.update(data, condition);
        resolve(task);
      } catch (error) {
        reject(error);
      }
    });
  };

  const deleteTask = condition => {
    return new Promise(async (resolve, reject) => {
      try {
        await Task.destroy(condition);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  return { getAllTasks, createTask, updateTask, deleteTask };
};

module.exports = taskRepository();
