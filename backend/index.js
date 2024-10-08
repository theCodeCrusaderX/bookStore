import express from "express";
import { PORT } from "./config.js";
import booksRoute from "./routes/bookRoute.js";
import cors from "cors"
import mongoose from "mongoose";
import 'dotenv/config'

const app = express();

// Middleware for handling CORS POLICY
const corsOptions = {
  origin: ["http://localhost:5173", "https://book-store-mu-flax.vercel.app"],
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

// Middleware for parsing request body
app.use(express.json());

app.get("/hello", (req, res) => {
  res.status(200).json({ message: "Hello!" });
});


app.use('/books', booksRoute);

mongoose
  .connect(process.env.mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
