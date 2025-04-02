const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
    const password = req.body.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!doesExist(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

// Get the entire book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here 
  res.send(JSON.stringify(books,null,4));
   
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on isbn
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  if (books[isbn]) {
    res.json(books[isbn]);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }  });
 
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    //Write your code here
    const author = req.params.author;
    const authorBooks = [];
  
    for (const isbn in books) {
      if (books.hasOwnProperty(isbn) && books[isbn].author === author) {
        authorBooks.push(books[isbn]);
      }
    }
  
    if (authorBooks.length > 0) {
      res.json(authorBooks);
    } else {
      res.status(404).json({ message: 'No books found for that author' });
    }
  });
 

// Get all books based on title
public_users.get('/title/:title',function (req, res) {

  //Write your code here
  const title = req.params.title;
  let foundBook = null;

  for (const isbn in books) {
    if (books.hasOwnProperty(isbn) && books[isbn].title === title) {
      foundBook = books[isbn];
      break; // Stop iterating once the book is found
    }
  }

  if (foundBook) {
    res.json(foundBook);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  if (books[isbn]) {
    const reviews = books[isbn].reviews;
    if (reviews && Object.keys(reviews).length > 0) {
      res.json(reviews);
    } else {
      res.status(404).json({ message: 'No reviews found for this book' });
    }
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

module.exports.general = public_users;
