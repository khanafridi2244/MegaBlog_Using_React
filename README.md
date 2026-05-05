# 🚀 Mega Blog - Appwrite + React

A full-stack blogging platform built with **React (Vite)** and **Appwrite** as the backend. Users can authenticate, create posts, upload images, and manage content seamlessly.

---

## 📌 Features

* 🔐 Authentication (Signup / Login)
* 📝 Create, Edit & Delete Blog Posts
* 🖼️ Image Upload with Appwrite Storage
* 📱 Responsive UI
* ⚡ Fast build with Vite
* ☁️ Backend powered by Appwrite

---

## 🛠️ Tech Stack

**Frontend**

* React (Vite)
* JavaScript (ES6+)
* CSS / Tailwind

**Backend**

* Appwrite (Auth, Database, Storage)

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/khanafridi2244/MegaBlog_Using_React.git
cd MegaBlog_Using_React
```

Install dependencies:

```bash
npm install
```

---

## 🔧 Environment Variables

Create a `.env` file in the root:

```env
VITE_APPWRITE_URL=your_endpoint
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
```

> ⚠️ Also add these variables in Vercel → Project Settings → Environment Variables

---

## ▶️ Run Locally

```bash
npm run dev
```

---

## 🏗️ Build for Production

```bash
npm run build
```

---

## 🚀 Deployment (Vercel)

1. Push code to GitHub
2. Import project into Vercel
3. Set environment variables
4. Deploy

---

## 🐞 Common Issues & Fixes

### ❌ Vercel Build Error (Case Sensitivity)

```
Could not resolve "./Login"
```

✔ Fix: Ensure file names match imports exactly:

```js
import Login from "./login"; // if file is login.jsx
```

---

### ❌ JSON Import Error (Node.js v20+)

```
SyntaxError: Unexpected identifier 'assert'
```

✔ Fix:

```js
import data from "./file.json" with { type: "json" };
```

---

## 📁 Project Structure

```
src/
 ├── components/
 ├── pages/
 ├── appwrite/
 ├── store/
 ├── utils/
 ├── App.jsx
 └── main.jsx
```

---

## 👨‍💻 Author

* Sikandar

---

## 📄 License

This project is licensed under the MIT License.

---

⭐ Star this repo if you found it helpful!
