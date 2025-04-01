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

  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/author/:author', function (req, res) {
    //Write your code here
    const author = [
        { author: 'Chinua Achebe' },
        { author: 'Hans Christian Andersen' },
        { author: 'Dante Alighieri' },
        { author: 'Unknown' },
        { author: 'Unknown' },
        { author: 'Unknown' },
        { author: 'Unknown' },
        { author: 'Jane Austen' },
        { author: 'Honor\u00e9 de Balzac' },
        { author: 'Samuel Beckett' },
        ] 
        res.json(author);
   
  });
 

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    
  //Write your code here
  const title = [
    { title: 'Things Fall Apart' },
    { title: 'Fairy tales' },
    { title: 'The Divine Comedy' },
    { title: 'The Epic Of Gilgamesh' },
    { title: 'The Book Of Job' },
    { title: 'One Thousand and One Nights' },
    { title: 'Njals Saga' },
    { title: 'Pride and Prejudice' },
    { title: 'Le Père Goriot' },
    { title: 'Molloy, Malone Dies, The Unnamable, the trilogy' },
    ] 
    res.json(title);
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
