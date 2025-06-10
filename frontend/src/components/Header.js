import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="text-lg font-bold cursor-pointer" onClick={() => navigate("/")}>
        Task Tracker
      </h1>
      <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
        Logout
      </button>
    </header>
  );
};

export default Header;
