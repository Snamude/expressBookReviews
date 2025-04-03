const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
const session = require('express-session');
const router = express.Router();
const app = express();
app.use(express.json());

//let users = [];
let users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
  ];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

//const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
//}
// Example authenticatedUser function (replace with your actual implementation)
function authenticatedUser(username, password) {
    // Assuming 'users' is an array of user objects
    let users = [
      { username: "user2", password: "password2" }, // User from your JSON
      // Add more users as needed
    ];
    return users.some((user) => user.username === username && user.password === password);
  }

//only registered users can login

//regd_users.post("/login", (req, res) => {
    regd_users.post("/customer/auth/login", (req, res) => {
    //Write your code here
    if (req.session.authorization) {
        let token = req.session.authorization['accessToken'];

        // Verify JWT token
        jwt.verify(token, "access", (err, user) => {
            if (!err) {
                req.user = user;
                next(); // Proceed to the next middleware
            } else {
                return res.status(403).json({ message: "User not authenticated" });
            }
        });
    } else {
        return res.status(403).json({ message: "User successfully logged in" });
    }
});

// Add a book review
regd_users.put("/auth/review/:title", (req, res) => {     
    //in general.js
     });

     
     regd_users.delete("/:review", (req, res) => {
        // Extract review parameter from request URL
        const review = req.params.review;
    
        if (review) {
        // Delete review from 'reviews' object based on provided username
            delete books[review];
        }
        
        // Send response confirming deletion of review
        res.send('user2 review for the ISBN ${isbn} is deleted..');    
    });


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
