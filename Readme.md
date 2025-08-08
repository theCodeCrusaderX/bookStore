# LIVE LINK
https://book-store-mu-flax.vercel.app/

# MERN Bookstore Project

A full-stack Bookstore application built with React (Vite), Express, Sequelize, and MySQL.

## Features

- List, create, edit, and delete books
- Delete all books at once
- Responsive UI with table and card views
- Animated background using WebGL particles
- Notifications for actions (using notistack)
- Backend API with RESTful endpoints
- MySQL database integration via Sequelize ORM

## Project Structure

```
bookStore/
├── backend/
│   ├── .env
│   ├── config.js
│   ├── index.js
│   ├── model/
│   │   └── bookModel.js
│   ├── routes/
│   │   └── bookRoute.js
│   └── syncDatabase.js
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   ├── components/
│   │   ├── pages/
│   │   └── assets/
├── package.json
└── .gitignore
```

## Getting Started

### Prerequisites

- Node.js 20.x
- MySQL database

### Backend Setup

1. Install dependencies:
   ```sh
   cd backend
   npm install
   ```
2. Configure your MySQL connection in `.env`:
   ```
   MYSQL_URL = mysql://user:password@host:port/database
   ```
3. Start the backend server:
   ```sh
   npm run dev
   ```

### Frontend Setup

1. Install dependencies:
   ```sh
   cd frontend
   npm install
   ```
2. Start the frontend development server:
   ```sh
   npm run dev
   ```
3. Visit [http://localhost:5173](http://localhost:5173) in your browser.

## API Endpoints

- `GET /books` — List all books
- `POST /books` — Create a new book
- `GET /books/:id` — Get details of a book
- `PUT /books/:id` — Edit a book
- `DELETE /books/:id` — Delete a book
- `DELETE /books/delAll` — Delete all books

## Technologies Used

- React, Vite, Tailwind CSS
- Express.js, Sequelize, MySQL
- notistack, react-icons

