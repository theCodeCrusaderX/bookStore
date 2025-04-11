// import express from "express";
// import { Book } from "../model/bookModel.js";

// const router = express.Router();

// // Route for Save a new Book

// // Route for Save a new Book
// router.post('/', async (request, response) => {
//   try {
//     if (
//       !request.body.title ||
//       !request.body.author ||
//       !request.body.publishYear
//     ) {
//       return response.status(400).send({
//         message: 'Send all required fields: title, author, publishYear',
//       });
//     }
//     const newBook = {
//       title: request.body.title,
//       author: request.body.author,
//       publishYear: request.body.publishYear,
//       discription: request.body.discription
//     };

//     const book = await Book.create(newBook);

//     return response.status(201).send(book);
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });

// // Route for Get All Books from database
// router.get("/", async (request, response) => {
//   try {
//     const books = await Book.find({});

//     return response.status(200).json({
//       count: books.length,
//       data: books,
//     });
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });

// // Route for Get One Book from database by id
// router.get("/:id", async (request, response) => {
//   try {
//     const { id } = request.params;

//     const book = await Book.findById(id);

//     return response.status(200).json(book);
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });

// // Route for Update a Book
// router.put("/:id", async (request, response) => {
//   try {
//     if (
//       !request.body.title ||
//       !request.body.author ||
//       !request.body.publishYear
//     ) {
//       return response.status(400).send({
//         message: "Send all required fields: title, author, publishYear",
//       });
//     }

//     const { id } = request.params;

//     const result = await Book.findByIdAndUpdate(id, request.body);

//     if (!result) {
//       return response.status(404).json({ message: "Book not found" });
//     }

//     return response.status(200).send({ message: "Book updated successfully" });
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });

// //Route for delete all Book
// router.delete("/delAll", async (request, response) => {
//   try {
//     const result = await Book.deleteMany({});

//     return response.status(200).send({
//       message: "All books deleted successfully",
//       deletedCount: result.deletedCount,
//     });
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });

// // Route for Delete a book
// router.delete("/:id", async (request, response) => {
//   try {
//     const { id } = request.params;

//     const result = await Book.findByIdAndDelete(id);

//     if (!result) {
//       return response.status(404).json({ message: "Book not found" });
//     }

//     return response.status(200).send({ message: "Book deleted successfully" });
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });

// export default router;






import express from "express";
import { Book } from "../model/bookModel.js";

const router = express.Router();

// Route for Save a new Book
router.post('/', async (req, res) => {
  try {
    const { title, author, publishYear, description } = req.body;
    if (!title || !author || !publishYear) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }
    const book = await Book.create({ title, author, publishYear, description });
    return res.status(201).send(book);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Get All Books
router.get("/", async (req, res) => {
  try {
    const books = await Book.findAll();
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
    const book = await Book.findByPk(id);
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
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    await book.update({ title, author, publishYear, description });
    return res.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Delete All Books
router.delete("/delAll", async (req, res) => {
  try {
    const result = await Book.destroy({ where: {} });
    return res.status(200).send({
      message: "All books deleted successfully",
      deletedCount: result,
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
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    await book.destroy();
    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
