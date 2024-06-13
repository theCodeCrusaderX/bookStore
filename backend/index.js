import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import booksRoute from "./routes/bookRoute.js";
import cors from "cors"
import mongoose from "mongoose";

const app = express();

// Middleware for handling CORS POLICY
app.use(cors({
  origin : "*"
}));

// Middleware for parsing request body
app.use(express.json());




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
