const express = require('express');
const Book = require('../models/book.model');
const router = express.Router();


router.get("/contact-me", () => {})


/* GET home page */
router.get("/books", (req, res, next) => {

    Book.find()
        .then((booksFromDB) => {
            console.log(booksFromDB)

            res.render("books/books-list", {books: booksFromDB})
        })
        .catch( e => {
            
            console.log("error getting the list of books from the DB");
            next(e)
        })

  //res.render("index");
});


router.get("/books/:bookId", (req, res, next) => {
    
    const id = req.params.bookId
    
    Book.findById(id)
    .then(bookFromDB => {

        res.render("books/book-details", bookFromDB), 
        console.log(bookFromDB)
        //res.send(`Hola ${id}`)

    })
    .catch( e => {
            
        console.log("error getting the list of books from the DB");
        next(e)
    })
    
})



module.exports = router;
