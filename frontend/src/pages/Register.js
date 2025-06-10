import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/taskApi";

const Register = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await registerUser(form);
      if (result.success) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("Registration failed.");
    }
  };

   const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="border p-2 w-full mb-4"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Register
        </button>
      </form>
      <div>
        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <a
           onClick={handleLogin}
            className="text-blue-500 underline"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
