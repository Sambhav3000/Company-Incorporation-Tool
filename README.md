# Company Incorporation Tool

A full-stack web application that allows an admin to:

* Sign up and log in using JWT authentication
* Create companies (Step 1)
* Add shareholders (Step 2)
* View all companies created by the logged-in admin
* Log out securely

The project is divided into two parts:

* `backend/` – Node.js + Express + Prisma + PostgreSQL
* `frontend/` – React + TypeScript + Axios

---

# 🛠️ Tech Stack

## Backend

* Node.js
* Express
* Prisma ORM
* PostgreSQL
* JWT Authentication
* bcrypt

## Frontend

* React (TypeScript)
* React Router
* Axios
* CSS Modules

---

# 📂 Project Structure

company-incorporation-tool/
│
├── backend/
│   ├── src/
│   ├── prisma/
│   └── package.json
│
├── frontend/
│   ├── src/
│   └── package.json

---

# ⚙️ Backend Setup Instructions

## 1️⃣ Navigate to backend folder

```bash
cd backend
```

## 2️⃣ Install dependencies

```bash
npm install
```

## 3️⃣ Setup environment variables

Create a `.env` file inside the `backend` folder:

```
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME"
JWT_SECRET="your_jwt_secret"
PORT=5000
```

Replace USER, PASSWORD, and DATABASE_NAME with your PostgreSQL credentials.

---

## 4️⃣ Setup Prisma

Generate Prisma client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

---

## 5️⃣ Start Backend Server

```bash
npm run dev
```

Backend will run on:

```
http://localhost:5000
```

---

# 💻 Frontend Setup Instructions

## 1️⃣ Navigate to frontend folder

```bash
cd frontend
```

## 2️⃣ Install dependencies

```bash
npm install
```

---

## 3️⃣ Start Frontend


```bash
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

````

---

# 🔐 Authentication Flow

1. Admin signs up.
2. Admin logs in.
3. Backend returns JWT token.
4. Token is stored in localStorage.
5. Axios automatically attaches token in Authorization header.
6. Protected routes verify token before allowing access.

---

# 🚀 How to Run the Full Application

Open TWO terminals:

### Terminal 1 – Backend

```bash
cd backend
npm run dev
````

### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

Then open your browser:

```
http://localhost:5173
```

---

# ✅ Application Flow

1. Signup
2. Login
3. Admin Dashboard
4. Add Company (Step 1)
5. Add Shareholders (Step 2)
6. View Companies (created by logged in admin only)
7. Logout

---

# 🧪 Testing Checklist

* Can signup successfully
* Can login and receive token
* Token stored in localStorage
* Admin page loads companies
* Step1 creates company
* Step2 adds shareholders
* Logout removes token and redirects to login

---

# 📌 Notes

* Make sure PostgreSQL is running before starting backend.
* Ensure CORS is enabled in backend if frontend runs on a different port.
* Always run `npx prisma generate` after updating schema.prisma.

---


---

# 📡 API Documentation

Base URL:

```
http://localhost:5000/api
```

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

---

## 🔐 Authentication Routes

### 1️⃣ Signup

**POST** `/auth/signup`

Request Body:

```json
{
  "email": "admin@example.com",
  "password": "123456"
}
```

Success Response:

```json
{
  "success": true,
  "message": "Admin created successfully"
}
```

---

### 2️⃣ Login

**POST** `/auth/login`

Request Body:

```json
{
  "email": "admin@example.com",
  "password": "123456"
}
```

Success Response:

```json
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "admin": {
      "id": 1,
      "email": "admin@example.com"
    }
  }
}
```

---

## 🏢 Company Routes (Protected)

### 3️⃣ Create Company (Step 1)

**POST** `/company/step1`

Request Body:

```json
{
  "name": "ABC Pvt Ltd",
  "totalCapital": 100000,
  "numberOfShareholders": 2
}
```

Success Response:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "ABC Pvt Ltd"
  }
}
```

---

### 4️⃣ Add Shareholders (Step 2)

**POST** `/company/step2/:companyId`

Request Body:

```json
{
  "shareholders": [
    {
      "firstName": "John",
      "lastName": "Doe",
      "nationality": "American"
    },
    {
      "firstName": "Jane",
      "lastName": "Smith",
      "nationality": "Canadian"
    }
  ]
}
```

Success Response:

```json
{
  "success": true,
  "message": "Shareholders added successfully"
}
```

---

### 5️⃣ Get All Companies (for logged-in admin)

**GET** `/company`

Success Response:

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "ABC Pvt Ltd",
      "totalCapital": 100000,
      "numberOfShareholders": 2,
      "shareholders": []
    }
  ]
}
```

---

### 6️⃣ Get Single Company

**GET** `/company/:companyId`

Success Response:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "ABC Pvt Ltd",
    "totalCapital": 100000,
    "numberOfShareholders": 2,
    "shareholders": []
  }
}
```

---

# 🔎 Error Response Format

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description here"
}
```

---

API documentation complete.

---

Future Improvements

Edit/Delete companies

Pagination

Role-based access

UI improvements


# 👨‍💻 Author

Sambhav Pandey
