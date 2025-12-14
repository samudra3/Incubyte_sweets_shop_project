🌐 Live Links

🔗 Frontend (Live Project)
👉 https://sweet-shop-frontend-15vvwxe20-sahil-singhs-projects-25af95e5.vercel.app

🔗 Backend API
👉 https://sweet-shop-backend-2-imm1.onrender.com

✨ Key Features
👤 Authentication & Authorization

🔹 User registration and login
🔹 JWT-based authentication
🔹 Role-based access control (User / Admin)
🔹 Protected routes enforced using middleware

🍭 Sweets Management (User)

🍬 View all available sweets
🍬 Search sweets by name
🍬 Filter sweets by category
🍬 Filter sweets by price range
🍬 Purchase sweets (inventory updates automatically)

🛠 Admin Capabilities

👑 Add new sweets
👑 Update sweet details
👑 Delete sweets
👑 Restock inventory
👑 Admin-only API route protection

🧰 Tech Stack

🎨 Frontend

🟢 React (Create React App)
🟢 Context API for authentication & global state
🟢 Fetch API for backend communication
🟢 CSS for responsive and clean UI

⚙ Backend

🔵 Node.js
🔵 Express.js
🔵 MongoDB with Mongoose
🔵 JWT Authentication
🔵 Role-based authorization middleware

🧪 Testing

🧫 Jest
🧫 Supertest
🧫 MongoDB Test Environment

🔌 API Overview
🔐 Authentication

📌 POST /api/auth/register
📌 POST /api/auth/login

🍭 Sweets (Protected)

📌 GET /api/sweets
📌 GET /api/sweets/search
📌 POST /api/sweets (Admin only)
📌 PUT /api/sweets/:id (Admin only)
📌 DELETE /api/sweets/:id (Admin only)

📦 Inventory

📌 POST /api/sweets/:id/purchase
📌 POST /api/sweets/:id/restock (Admin only)

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
▶ Backend
cd backend
npm install
npm start

▶ Frontend
cd frontend
npm install
npm start

🧪 Testing Summary

✅ Authentication tests
✅ Authorization & role-based access tests
✅ Sweets CRUD operations
✅ Inventory purchase & restock logic

🟢 Total Tests: 14
🟢 Passed: 14 / 14

Fail → Fix → Refactor methodology followed throughout development.

🤖 My AI Usage
🧠 AI Tools Used

🤖 ChatGPT

🛠 How I Used AI

✨ Brainstormed backend API structure and endpoint responsibilities
✨ Generated initial unit test templates for authentication & authorization
✨ Assisted in refactoring controllers and middleware logic
✨ Helped validate edge cases during API testing

🧩 Reflection on AI Usage

🧠 AI significantly improved my development speed, especially during testing and refactoring.
🧠 It reduced repetitive boilerplate work and suggested alternate approaches.

However:
⚠ All AI-generated code was manually reviewed
⚠ Logic was debugged and modified to match real requirements
⚠ Final architectural and implementation decisions were entirely mine

AI was used strictly as a supporting assistant, not as a replacement for understanding or decision-making.
