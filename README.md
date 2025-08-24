
# 🏪 Store Sphere Ratings Platform

A **role-based full-stack application** where users can register, log in, and interact with stores.
Supports 3 roles:

* **System Administrator** 🛠️
* **Normal User** 👤
* **Store Owner** 🏬

The project uses **React (frontend)** + **Node.js + Express (backend)** + **MySQL (database)**.
Authentication is handled using **JWT (JSON Web Tokens)**.

---

## 📂 Project Structure

```
project/
│── backend/
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── normalUserRoutes.js
│   │   ├── storeOwnerRoutes.js
│   ├── middleware/
│   │   ├── auth.js
│   ├── server.js
│   ├── package.json
│── frontend/
│   ├── src/
│   │   ├── pages/ (Login, Signup, Dashboard, etc.)
│   │   ├── components/ (Navbar, Footer, Table, Filter, etc.)
│   ├── package.json
│── .env
│── README.md
```

---

## ⚙️ Backend Setup

### 1️⃣ Install dependencies

```bash
cd backend
npm install
```

Dependencies include:

* `express`
* `mysql2`
* `cors`
* `dotenv`
* `jsonwebtoken`
* `bcryptjs` (for password hashing)

---

### 2️⃣ Configure Environment Variables

Create a `.env` file in `backend/`:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_DATABASE=store_ratings
JWT_SECRET=yourjwtsecret
```

---

### 3️⃣ Run Backend

```bash
npm start
```

If successful, you’ll see:

```
Connected to MySQL database as id 10
Server running on port 5000
```

---

## ⚙️ Frontend Setup

### 1️⃣ Install dependencies

```bash
cd frontend
npm install
```

Dependencies include:

* `react-router-dom`
* `axios`
* `tailwindcss` (or shadcn/ui for UI components)

---

### 2️⃣ Run Frontend

```bash
npm run dev
```

Default frontend URL:
👉 `http://localhost:5173`

---

## 🔐 Authentication & Roles

### JWT Middleware (`backend/middleware/auth.js`)

* Validates JWT token (`x-auth-token` header).
* Extracts user role and attaches it to `req.user`.
* Blocks unauthorized requests.

### Role-Based Access

```js
router.get("/admin-dashboard", auth, checkRole(["System Administrator"]), (req, res) => {
  res.json({ msg: "Welcome Admin" });
});
```

* **System Administrator** → Manage everything.
* **Store Owner** → Manage stores.
* **Normal User** → Rate/view stores.

---

## 🛠️ API Routes

### Auth Routes

* `POST /api/auth/signup` → Register user (with role)
* `POST /api/auth/login` → Login and get JWT

### Role Routes

* `GET /api/admin/...` → Admin-only routes
* `GET /api/normal-user/...` → Normal user routes
* `GET /api/store-owner/...` → Store owner routes

---

## 🧪 Testing

1. Start backend & frontend.
2. Sign up users with different roles.
3. Log in → Save token in `localStorage`.
4. Try calling protected routes with `x-auth-token`.

Example with `fetch`:

```js
fetch("/api/admin/dashboard", {
  headers: { "x-auth-token": localStorage.getItem("token") }
});
```

---

## 🚀 Features

* 🔑 Secure authentication with JWT
* 👥 Role-based access control
* 📊 Store rating system
* 📱 Responsive UI with React + Tailwind

---

## 📌 Future Improvements

* Refresh tokens
* Email verification
* Better error handling
* Admin analytics dashboard

---


