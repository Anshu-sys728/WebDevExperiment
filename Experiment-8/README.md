# Experiment 8: Book Collection API

## Aim

Build a simple REST API with Node.js and Express to add, view, update, and delete books.

## Tools used

- Node.js
- Express.js
- Postman or another API testing tool

## Run the API

1. Install Node.js 18 or newer.
2. Open a terminal in the `Experiment-8` folder.
3. Install Express:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm start
   ```

The API runs at `http://localhost:3000`. The sample books are kept in memory, so they reset when the server restarts.

## Routes

| Method | URL | What it does |
|---|---|---|
| GET | `/api/books` | Get all books |
| GET | `/api/books/1` | Get one book by its ID |
| POST | `/api/books` | Add a book |
| PUT | `/api/books/1` | Update a book |
| DELETE | `/api/books/1` | Delete a book |

For **POST** and **PUT**, choose **Body > raw > JSON** in Postman and send:

```json
{
  "title": "Charlotte's Web",
  "author": "E. B. White",
  "year": 1952
}
```

The API returns JSON. It reports an error if the book details are missing or if the requested book does not exist.

## Note about GitHub Pages

GitHub Pages hosts static websites and cannot run a Node.js server. The source code is in this repository; run the API on your computer by following the steps above.
