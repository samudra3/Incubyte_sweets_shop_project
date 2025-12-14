🍬 Sweet Shop Management System

A full-stack Sweet Shop Management System built with React on the frontend and Node.js + Express + MongoDB on the backend.
The application supports user authentication, role-based access control, inventory management, and a smooth shopping experience for users.

🔗 Live Project:
👉 https://sweetsshop-4jdqcloc1-sahil-singhs-projects-25af95e5.vercel.app

🔗 Backend API:
👉 https://sweet-shop-backend-2-imm1.onrender.com

✨ Features
👤 Authentication

User registration and login

JWT-based authentication

Role-based authorization (User / Admin)

🍭 Sweets Management

View all available sweets

Search sweets by name, category, or price range

Purchase sweets (quantity decreases automatically)

🛠 Admin Features

Add new sweets

Update sweet details

Delete sweets

Restock inventory

📸 Application Screenshots
![alt text](<Screenshot from 2025-12-14 07-24-54.png>)

🔐 Login & Registration
![alt text](image.png)

🏠 User Dashboard
![alt text](image.png)

👑 Admin Management Panel

🧰 Tech Stack
Frontend

React (Create React App)

Context API for authentication

Fetch API for backend communication

CSS for responsive UI

Backend

Node.js

Express.js

MongoDB & Mongoose

JWT Authentication

Role-based middleware

🔌 API Overview
Auth

POST /api/auth/register

POST /api/auth/login

* Sweets (Protected)

GET /api/sweets

GET /api/sweets/search

POST /api/sweets (Admin)

PUT /api/sweets/:id (Admin)

DELETE /api/sweets/:id (Admin)

* Inventory

POST /api/sweets/:id/purchase

POST /api/sweets/:id/restock (Admin)

🤖 My AI Usage

AI Tools Used

ChatGPT

* How I Used AI

To brainstorm backend API structure and endpoint behavior

To generate initial unit test cases for authentication and role authorization

To assist in refactoring controllers and middleware logic

To validate edge cases during API testing

* Reflection on AI Usage

AI significantly improved my development speed, especially during the testing and refactoring phase.
However, I manually reviewed, debugged, and adjusted all AI-generated code to ensure correctness and alignment with project requirements. AI acted as a supporting assistant, not a replacement for understanding or decision-making.

📁 Project Structure (High Level)
frontend/
  ├── src/
  ├── public/

backend/
  ├── src/
  ├── tests/
  ├── middlewares/
  ├── modules/

screenshots/
  ├── login.png
  ├── dashboard.png
  ├── admin.png

🚀 How to Run Locally
Backend
cd /backend
npm install
npm start

Frontend
cd /frontend
npm install
npm start
