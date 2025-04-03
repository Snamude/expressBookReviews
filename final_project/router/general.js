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

// Task 10 book list available in shop using Promises
public_users.get('/',function (req, res) {
  //Write your code here 
  const get_books = new Promise((resolve, reject) => {
    resolve(res.send(JSON.stringify({books}, null, 4)));
});
get_books.then(() => console.log("Promise for Task 10 resolved"));
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

  // Task 11 Get book details based on ISBN using Promises
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const get_books_isbn = new Promise((resolve, reject) => {
  	const isbn = req.params.isbn;
  	// console.log(isbn);
  		if (req.params.isbn <= 10) {
  			resolve(res.send(books[isbn]));
  		}	
  		  else {
  		  	reject(res.send('ISBN not found.'));
  		  }
  });
  get_books_isbn.then(function(){
  		console.log('Promise for Task 11 is resolved.');
  }); 
});
 
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
 
  // Task 12 Get book details based on Author using Promises
public_users.get('/books/author/:author', function (req, res) {
  //Write your code here
  const get_books_author = new Promise((resolve, reject) => {

  	let booksbyauthor = [];
  	let isbns = Object.keys(books);
  	isbn.forEach((isbn) => {
  		if(books[isbn]['author'] === req.params.author) {
  			booksbyauthor.push({'isbn': isbn,
  								'title': books[isbn]['title'],
  								'reviews': books[isbn]['reviews']});
  		resolve(res.send(JSON.stringify({booksbyauthor}, null, 4)));
  		}
  	});
  	reject(res.send("The mentioned author doesn't exist."));
  });
  get_books_author.then(function(){
  		console.log('Promise is resolved.');
  }).catch(function () {
  		console.log("The mentioned author doesn't exist."); 
  });
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

// Task 13 Get book details based on title using Promises
public_users.get('/books/title/:title', function (req, res) {
  //Write your code here
  const get_books_title = new Promise((resolve, reject) => {

  	let booksbytitle = [];
  	let isbns = Object.keys(books);
  	isbn.forEach((isbn) => {
  		if(books[isbn]['title'] === req.params.title) {
  			booksbytitle.push({'isbn': isbn,
  								'title': books[isbn]['title'],
  								'reviews': books[isbn]['reviews']});
  		resolve(res.send(JSON.stringify({booksbytitle}, null, 4)));
  		}
  	});
  	reject(res.send("The mentioned title doesn't exist."));
  });
  get_books_title.then(function(){
  		console.log('Promise is resolved.');
  }).catch(function () {
  		console.log("The mentioned title doesn't exist."); 
  });
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

//  Add a book review
public_users.put('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  if (books[isbn]) {
      //return res.status(300).json({message: "Yet to be implemented"});
      res.send('Review for ISBN ${isbn} added/modified.');
  } 
});

module.exports.general = public_users;
