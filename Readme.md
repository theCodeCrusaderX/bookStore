# LIVE LINK

Visit [https://book-store-mu-flax.vercel.app/](https://book-store-mu-flax.vercel.app/) in your browser.


# # BookStore MERN App

A full-stack BookStore application built with React (Vite), Express, Prisma, PostgreSQL, and Cloudinary.

## Features

- Add, edit, delete, and list books
- Upload book cover images (Cloudinary)
- AI-powered book description generation (Google Gemini)
- Drag-and-drop and click-to-upload for images
- Responsive UI with Tailwind CSS
- Notifications for user actions (notistack)
- RESTful API backend

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, notistack
- **Backend:** Express.js, Prisma ORM, PostgreSQL
- **Image Upload:** Multer, Cloudinary
- **AI Integration:** Google Gemini API

## Project Structure

```
bookStore/
├── backend/
│   ├── index.js
│   ├── config.js
│   ├── routes/
│   │   └── bookRoute.js
│   ├── middlewares/
│   │   └── multer.js
│   ├── utils/
│   │   └── cloudinary.js
│   ├── prisma/
│   │   └── schema.prisma
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── CreateBook.jsx
│   │   │   ├── EditBook.jsx
│   │   └── components/
│   ├── index.html
│   ├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 20.x
- PostgreSQL database
- Cloudinary account (for image uploads)
- Google Gemini API key (for AI descriptions)

### Backend Setup

1. Install dependencies:
   ```sh
   cd backend
   npm install
   ```
2. Configure your `.env` file:
   ```
   DATABASE_URL=postgresql://user:password@host:port/database
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   GEMINI_API_KEY=your_gemini_api_key
   ```
3. Run Prisma migrations and generate client:
   ```sh
   npx prisma migrate dev
   npx prisma generate
   ```
4. Start the backend server:
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

- `POST /books` — Create a new book
- `GET /books` — List all books
- `GET /books/:id` — Get a book by ID
- `PUT /books/:id` — Edit a book
- `DELETE /books/:id` — Delete a book
- `DELETE /books/delAll` — Delete all books
- `POST /books/upload` — Upload book image
- `POST /books/generate-description` — Generate book description with AI


<p align="center">💓 by Dinesh Kumar Shaw</p>
