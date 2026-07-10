
import express from "express";
import { prisma } from "../config.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// 1. Import the GoogleGenerativeAI class
import { GoogleGenerativeAI } from "@google/generative-ai";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

// 2. Initialize the Gemini client
// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.route('/upload').post(upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    // Upload the file to Cloudinary
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;

    const result = await uploadOnCloudinary(url);
    if (!result) {
      return res.status(500).json({ error: "Failed to upload file" });
    }

    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

router.post("/generate-description", async (req, res) => {
  const { bookName } = req.body;

  if (!bookName) {
    return res.status(400).json({ error: "bookName is required" });
  }

  try {
    // 3. Choose a Gemini model
    // gemini-1.5-flash-latest is great for fast, general-purpose tasks.
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Write a compelling, one-paragraph book description for "${bookName}". The response must be the description text only, with no introductory phrases, bullet points, or multiple options.`;

    // 4. Call the Gemini API to generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const description = response.text();

    // 5. Send the extracted text back in the response
    res.json({ description });

  } catch (error) {
    console.error("Error generating description with Gemini:", error);
    res.status(500).json({ error: "Failed to generate description." });
  }
});

// Route for Save a new Book
router.post('/', async (req, res) => {
  try {
    const { title, author, publishYear, description, imageUrl } = req.body;
    if (!title || !author || !publishYear) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }
    const book = await prisma.book.create({ data: { title, author, publishYear, description, imageUrl } });
    return res.status(201).send(book);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Get All Books
router.get("/", async (req, res) => {
  try {
    const books = await prisma.book.findMany();
    return res.status(200).json({
      count: books.length,
      data: books,
    });   
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Get One Book by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await prisma.book.findUnique({ where: { id: Number(id) } });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json(book);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Update a Book
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, publishYear, description } = req.body;
    if (!title || !author || !publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const book = await prisma.book.findUnique({ where: { id: Number(id) } });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    await prisma.book.update({ where: { id: Number(id) }, data: { title, author, publishYear, description } });
    return res.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Delete All Books
router.delete("/delAll", async (req, res) => {
  try {
    const result = await prisma.book.deleteMany();
    return res.status(200).send({
      message: "All books deleted successfully",
      deletedCount: result.count,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Delete a Book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await prisma.book.findUnique({ where: { id: Number(id) } });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    await prisma.book.delete({ where: { id: Number(id) } });
    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
