'use strict';
require('dotenv').config();

const superagent = require('superagent');
const BOOK_KEY = process.env.BOOK_KEY;
const client = require('../utility/database');
const handleError = require('./error');

//queries the API
function bookHandler(request, response, next) {
    const url = 'https://www.googleapis.com/books/v1/volumes';
    superagent(url)
        .query({
            key: BOOK_KEY,
            q: `+in${request.body.radio}:${request.body.searchTerm}`
        })
        .then(bookResponse => {
            console.log(response.body);
            const bookData = bookResponse.body; // JSON.parse(bookResponse.text);
            const bookResults = bookData.items.map(bookStats => {
                return new Book(bookStats);
            });
            response.send(bookResults);
            // response.render('pages/searches/show');
        })
        .catch(err => {
            console.error(err);
            next(err);
        });
}


// get books from database
function getBooks(request, response) {
    const SQL = 'SELECT * FROM books;';

    client.query(SQL)
        .then(results => {
            const { rowcount, rows } = results;
            console.log(' / db result', rows);

            // response.send('rows')
            response.render('index', {
                books: rows
            });
        })
        .catch(err => {
            handleError(err, response);
        });
}


// Book constructor!
function Book(bookStats) {
    const placeHolderImage = 'https://i.pinimg.com/originals/7b/41/f7/7b41f7ae3ac370c966f3931ed4ab991c.jpg';
    let httpRegex = /^(http:\/\/)/g

    this.title = bookStats.volumeInfo.title ? bookStats.volumeInfo.title : 'Title does not exist';
    this.author = bookStats.volumeInfo.authors ? bookStats.volumeInfo.authors : 'We currently do not have any books by this author, contact us about getting this Author';
    this.isbn = bookStats.volumeInfo.industryIdentifiers ? `ISBN_13 ${volumeInfo.industryIdentifiers[0].identifier}` : 'No ISBN available at this time, we are working on setting this up.';
    this.image = bookStats.volumeInfo.imageLinks ? bookStats.volumeInfo.imageLinks.smallThumbnail.replace(httpRegex, 'https://') : placeHolderImage;
    this.summary = bookStats.volumeInfo.summary ? bookStats.volumeInfo.summary : 'Reading the book now, summary coming soon!';

}

module.exports = bookHandler;

