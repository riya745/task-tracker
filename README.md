# 📝 Task Tracker App

A full-stack Task Tracker application built with React (frontend) and Node.js/Express (backend). It allows users to register, log in, create, edit, and manage tasks efficiently.

---

## 🗂️ Project Structure

task-tracker/
├── backend/ # Node.js/Express API
└── frontend/ # React application


---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

---

## ⚡️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/riya745/task-tracker.git
cd task-tracker

Backend Setup
cd backend
npm install

Configure Environment Variables
Create a .env file in the backend directory by copying the example:
cp .env.example .env
Update the .env file with your database credentials and secret key.

🛠️ Environment Variables
Backend (.env)
APP_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
JWT_SECRET=
PS - I used MySQL DB

Run the Backend Server
npm run dev
The backend server will start on the port specified in .env (default: 5000).

In a separate terminal:
cd frontend
npm install

Start the Frontend
npm start

🛠️ Environment Variables
Fronend(.env)
REACT_APP_BASE_URL=http://localhost:5000/api


The frontend will start on http://localhost:3000.


✨ Features
User Registration and Login

JWT Authentication

Create, Edit, and Delete Tasks

Mark Tasks as Pending/Completed

TailwindCSS for responsive design

📦 Technologies Used
Frontend: React, TailwindCSS

Backend: Node.js, Express, Sequelize ORM, PostgreSQL

Authentication: JSON Web Tokens (JWT)

🗃️ Sample Data
No seed data provided by default; create tasks manually through the UI.


📧 Contact
For questions or support, please reach out to ria.joshi19.rj1@gmail.com



---

Let me know if you’d like help customizing this further! 🚀
