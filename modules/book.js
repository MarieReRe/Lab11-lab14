'use strict';
require('dotenv').config();

const superagent = require('superagent');






//create route handler
function bookHandler(request, reponse, next) {
    const titleQuery = `${request.query.title}+intitle`;
    const authorQuery = `${request.query.author}+inauthor`;
    const url = 'https://www.googleapis.com/books/v1/volumes';
    superagent.get(url)
        .query({
            key: process.env.GOOGLE_KEY,
            // q: 

        })
        .then(booksResponse => {
            let booksData = booksResponse.body;
            let searchResults = booksData.books.map(bookData => {
                return new Books(bookData);
            })
            response.send(searchResults);
        })
           .catch(err => 
            handleError(err, response));
};



// book constructor function
function Books(bookData) {
    this.title = bookData.volumeinfo.title ? bookData.volumeinfo.title : 'This title does not exist';
    this.author = bookData.volumeinfo.authors ? bookData.volumeinfo.authors : 'We currently do not have any books by this author, contact us about getting this Author';
    // this.ISBN =
    // this.description =
};



module.exports = bookHandler;