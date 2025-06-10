import axios from "axios";
import { baseUrl } from "../config";

// REGISTER
export const registerUser = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/register`, body);
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};

// LOGIN
export const loginUser = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, body);
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};

// GET TASKS
export const getTasks = async (status = "", sort = "") => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${baseUrl}/tasks?status=${status}&sort=${sort}`,
        {
          headers: {
            "auth-token": `Bearer ${token}`,
          },
        }
      );
      resolve(response.data.data)
    } catch (error) {
      reject(error);
    }
  });
};

// CREATE TASK
export const createTask = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${baseUrl}/tasks`, body, {
        headers: {
          "auth-token": `Bearer ${token}`,
        },
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};

// UPDATE TASK
export const updateTask = async (id, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${baseUrl}/tasks/${id}`, body, {
        headers: {
          "auth-token": `Bearer ${token}`,
        },
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};

// DELETE TASK
export const deleteTask = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${baseUrl}/tasks/${id}`, {
        headers: {
          "auth-token": `Bearer ${token}`,
        },
      });
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
