const express = require('express');
const Author = require('../models/Author.model')
const router = express.Router();

router.get("/authors", (req, res, next) => {

    Author.find()

        .then((authorsFromDB) => {
            console.log(authorsFromDB)

            res.render("authors/authors-list", { authors: authorsFromDB })
        })
        .catch(e => {

            console.log("error getting the list of authors from the DB");
            next(e)
        })
});

module.exports = router;