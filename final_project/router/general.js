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
  return res.status(300).json({message: "Yet to be implemented"});
 });
 
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    //Write your code here

    const author = [
        { author: 'Chinua Achebe', 
        title: "Things Fall Apart", },
        { author: 'Hans Christian Andersen', 
          title: "Fairy tales", },
        { author: 'Dante Alighieri', 
        title: "The Divine Comedy", },
        { author: 'Unknown', 
        title: "The Epic Of Gilgamesh",  },
        { author: 'Unknown',
        title: "The Book Of Job", },
        { author: 'Unknown', 
        title: "One Thousand and One Nights",}, 
        { author: 'Unknown', 
        title: "Nj\u00e1l's Saga", },
        { author: 'Jane Austen', 
        title: "Pride and Prejudice",},
        { author: 'Honor\u00e9 de Balzac', 
        title: "Le P\u00e8re Goriot", },
        { author: 'Samuel Beckett', 
        title: "Molloy, Malone Dies, The Unnamable, the trilogy",},
        ] 
        res.json(author);

    //Console log before calling the promise
    console.log("Searching for books based on author");
          //Creating a promise method. The promise will get resolved when timer times out after 6 seconds.
let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("Promise resolved")
    },6000)})

//Call the promise and wait for it to be resolved and then print a message.
myPromise.then((successMessage) => {
    console.log("Callback " + successMessage)
  })

//Console log after calling the promise
  console.log("Complete list of books by authors");
   
  });
 

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    
  //Write your code here
  const title = [
    { title: 'Things Fall Apart', 
    author: 'Chinua Achebe',},
    { title: 'Fairy tales',
    author: 'Hans Christian Andersen', },
    { title: 'The Divine Comedy', 
    author: 'Dante Alighieri', },
    { title: 'The Epic Of Gilgamesh', 
    author: 'Unknown',},
    { title: 'The Book Of Job', 
    author: 'Unknown',},
    { title: 'One Thousand and One Nights', 
    author: 'Unknown',},
    { title: 'Njals Saga',
    author: 'Unknown', },
    { title: 'Pride and Prejudice',
    author: 'Jane Austen', },
    { title: 'Le Père Goriot', 
    author: 'Honor\u00e9 de Balzac',},
    { title: 'Molloy, Malone Dies, The Unnamable, the trilogy',
    author: 'Samuel Beckett',},
    ] 
    res.json(title);

    //Console log before calling the promise
    console.log("Searching for books based on title");
          //Creating a promise method. The promise will get resolved when timer times out after 6 seconds.
let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("Promise resolved")
    },6000)})

//Call the promise and wait for it to be resolved and then print a message.
myPromise.then((successMessage) => {
    console.log("Callback " + successMessage)
  })

//Console log after calling the promise
  console.log("Complete list of books by title");
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const review = [
    { review: 'Interesting book. Great Read.' },
    { review: 'A victorian times set with great costumes.' },
    { review: 'Had me laughing up a storm.' },
    { review: 'Epic read.' },
    { review: "If you like to read the Bible, you'll like this book." },
    { review: "Couldn't put the book down." },
    { review: "Its a saga alright. Interesting read." },
    { review: 'Victorian times type of book.' },
    { review: 'A Goriot worth a read.' },
    { review: 'A trilogy worth a read.' },
    ]
    res.json(review);
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
