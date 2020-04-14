'use strict';

const superagent = require('superagent');
require('dotenv').config();

//create route hadnler
function bookHandler(request, reponse, next) {
    const titleQuery = `${request.query.title}+intitle`;
    const authorQuery =`${request.query.author}+inauthor`;
    const url = 'https://www.googleapis.com/books/v1/volumes';
    superagent.get(url)
        .query({
            key: process.env.GOOGLE_KEY,
            q: 
        
            // author: request.query.authors
        })
        .then(booksResponse => {
            let booksData = booksResponse.body;
            let searchResults = booksData.books.map(bookData => {
                return new Books(bookData);
            })
            response.send(searchResults);
        })
        .catch(err => {
            console.error(err);
            next(err);
        });

};



// book constructor function
function Books(bookData) {
    this.title = bookData.volumeinfo.title ? bookData.volumeinfo.title : 'This title does not exist';
    this.author = bookData.volumeinfo.authors ? bookData.volumeinfo.authors : 'We currently do not have any books by this author, contact us about getting this Author';
        // this.ISBN =
        // this.description =
};

module.exports = bookHandler;