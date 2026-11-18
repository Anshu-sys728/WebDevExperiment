const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

let nextId = 4;
let books = [
    { id: 1, title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 },
    { id: 2, title: "Pride and Prejudice", author: "Jane Austen", year: 1813 },
    { id: 3, title: "The Little Prince", author: "Antoine de Saint-Exupery", year: 1943 },
];

function findBook(id) {
    return books.find((book) => book.id === Number(id));
}

function validBookDetails({ title, author, year }) {
    return typeof title === "string" &&
        title.trim() !== "" &&
        typeof author === "string" &&
        author.trim() !== "" &&
        Number.isInteger(year) &&
        year > 0;
}

app.get("/", (req, res) => {
    res.json({
        message: "Book Collection API",
        routes: [
            "GET /api/books",
            "GET /api/books/:id",
            "POST /api/books",
            "PUT /api/books/:id",
            "DELETE /api/books/:id",
        ],
    });
});

app.get("/api/books", (req, res) => {
    res.json(books);
});

app.get("/api/books/:id", (req, res) => {
    const book = findBook(req.params.id);
    if (!book) {
        return res.status(404).json({ error: "Book not found." });
    }
    res.json(book);
});

app.post("/api/books", (req, res) => {
    if (!validBookDetails(req.body || {})) {
        return res.status(400).json({
            error: "Enter a title, author, and whole-number year.",
        });
    }

    const newBook = {
        id: nextId,
        title: req.body.title.trim(),
        author: req.body.author.trim(),
        year: req.body.year,
    };
    nextId += 1;
    books.push(newBook);
    res.status(201).json(newBook);
});

app.put("/api/books/:id", (req, res) => {
    const book = findBook(req.params.id);
    if (!book) {
        return res.status(404).json({ error: "Book not found." });
    }
    if (!validBookDetails(req.body || {})) {
        return res.status(400).json({
            error: "Enter a title, author, and whole-number year.",
        });
    }

    book.title = req.body.title.trim();
    book.author = req.body.author.trim();
    book.year = req.body.year;
    res.json(book);
});

app.delete("/api/books/:id", (req, res) => {
    const book = findBook(req.params.id);
    if (!book) {
        return res.status(404).json({ error: "Book not found." });
    }

    books = books.filter((item) => item.id !== book.id);
    res.json({ message: "Book deleted." });
});

app.use((req, res) => {
    res.status(404).json({ error: "Route not found." });
});

app.use((error, req, res, next) => {
    if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
        return res.status(400).json({ error: "Request body must be valid JSON." });
    }
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
});

app.listen(port, () => {
    console.log(`Book API is running at http://localhost:${port}`);
});
