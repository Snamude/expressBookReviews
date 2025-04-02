const express = require('express');
const router = express.Router();

let books = {
      1: {"isbn": "1", "author": "Chinua Achebe","title": "Things Fall Apart", "reviews": "Interesting book. Great Read." },
      2: {"isbn": "2","author": "Hans Christian Andersen","title": "Fairy tales", "reviews": "A victorian times set with great costumes." },
      3: {"isbn": "3","author": "Dante Alighieri","title": "The Divine Comedy", "reviews": "Had me laughing up a storm." },
      4: {"isbn": "4","author": "Unknown","title": "The Epic Of Gilgamesh", "reviews": "Epic read." },
      5: {"isbn": "5","author": "Unknown","title": "The Book Of Job", "reviews": "If you like to read the Bible, you'll like this book." },
      6: {"isbn": "6","author": "Unknown","title": "One Thousand and One Nights", "reviews": "Couldn't put the book down." },
      7: {"isbn": "7","author": "Unknown","title": "Nj\u00e1l's Saga", "reviews": "Its a saga alright. Interesting read." },
      8: {"isbn": "8","author": "Jane Austen","title": "Pride and Prejudice", "reviews": "Victorian times type of book." },
      9: {"isbn": "9","author": "Honor\u00e9 de Balzac","title": "Le P\u00e8re Goriot", "reviews": "A Goriot worth a read." },
      10: {"isbn": "10","author": "Samuel Beckett","title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": "A trilogy worth a read." }
}

//GET request: Retrieve all books
router.get("/",(req,res)=>{
      res.send(books);
});

module.exports=books;
