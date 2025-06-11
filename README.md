# 📝 BlogApp - Full Stack Blog Application

This is a full stack blog application where users can create, view, and manage blog posts. The project uses **React.js (Frontend)** and **Node.js + Express.js (Backend)** with file-based storage using a JSON file.

##  Features

- User Authentication (Login & Signup)
- Create, View, and List Blog Posts
- Pagination support
- File-based database using JSON file
- Clean and Responsive UI
- Protected routes
- Full-stack architecture


## Tech Stack

### Frontend

- React.js (with TypeScript support)
- React Router DOM
- Context API for Authentication
- Axios (HTTP Client)

### Backend

- Node.js
- Express.js
- Body-Parser
- CORS
- JSON file storage (`blogs.json`)

---

## 📂 Folder Structure

```bash
blogapp/
│
├── backend/
│   ├── server.js          # Express server entry
│   ├── blogs.json         # Blog storage file
│   └── routes/            # Backend routes
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI Components
│   │   ├── pages/          # Login, Signup, Create Blog, Home Pages
│   │   ├── contexts/       # AuthContext
│   │   ├── services/       # API calls (Axios)
│   │   └── App.tsx
│   └── package.json
│
├── README.md
└── package.json
