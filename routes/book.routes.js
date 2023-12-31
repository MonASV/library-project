const express = require('express');
const Book = require('../models/book.model');
const Author = require('../models/Author.model')
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn')


router.get("/contact-me", () => { })


/* GET home page */

router.get("/books", (req, res, next) => {

    Book.find()
        .populate("author")
        .then((booksFromDB) => {
            console.log(booksFromDB)

            res.render("books/books-list", { books: booksFromDB })
        })
        .catch(e => {

            console.log("error getting the list of books from the DB");
            next(e)
        })

});

// display from

router.get("/books/create", isLoggedIn, (req, res, next) => {
    Author.find()
        .then( authorsFromDB => {
            const data = {
                authors: authorsFromDB
            }
            res.render("books/book-create", data);
        })
        .catch((e) => {
            console.log("Error getting list of authors from DB", e);
            next(e);
        });
});

//proccess from

router.post("/books/create", isLoggedIn, (req, res, next) => {

    const newBook = {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        rating: req.body.rating

    }
    Book.create(newBook)
            .then(() => {
            console.log(newBook)
            res.redirect("/books")
        })
        .catch(e => {
            console.log("error creating new book", e)
            next(e)
        })
})


router.get('/books/:bookId/edit', isLoggedIn, async (req, res, next) => {
    const { bookId } = req.params;

    try {
        const bookDetails = await Book.findById(bookId)
        const authors = await Author.find()
        const data = {
            book: bookDetails,
            authors: authors
        }

        res.render('books/book-edit', data)
    }
    catch(e){

    }

});



router.post('/books/:bookId/edit', isLoggedIn, (req, res, next) => {
    const { bookId } = req.params;
    const { title, description, author, rating } = req.body;

    Book.findByIdAndUpdate(bookId, { title, description, author, rating }, { new: true })
        .then(updatedBook => res.redirect(`/books/${updatedBook.id}`))
        .catch(error => next(error));
});



router.post('/books/:bookId/delete', isLoggedIn, (req, res, next) => {
    const { bookId } = req.params;

    Book.findByIdAndDelete(bookId)
        .then(() => res.redirect('/books'))
        .catch(error => next(error));
});


router.get("/books/:bookId", (req, res, next) => {

    const id = req.params.bookId

    Book.findById(id)
        .populate("author")
        .then(bookFromDB => {

            res.render("books/book-details", bookFromDB),
                console.log(bookFromDB)
            //res.send(`Hola ${id}`)

        })
        .catch(e => {

            console.log("error getting the list of books from the DB");
            next(e)
        })

})




module.exports = router;
