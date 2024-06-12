import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import booksRoute from "./routes/bookRoute.js";
import cors from "cors"
import mongoose from "mongoose";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
// Option 2: Allow Custom Origins

// app.use(
//   cors({
//     origin: `http://localhost:5173`,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

// const corsOptions = {
//   origin: 'https://localhost:5173', // Replace with your frontend origin
//   optionsSuccessStatus: 200
// };

// app.use(cors(corsOptions));

app.use(cors({
  origin : "https://book-store-app-omega.vercel.app",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials : true,
  allowedHeaders: ['Content-Type'],
}));


app.get("/", (req, res) => {
  res.send("hello and welcome to my first mern stack project");
});

app.use('/books', booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
