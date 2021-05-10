import Book from '../models/book.js';
import express from 'express';
const apiRouter = express.Router();

apiRouter.post('/book/new', (req, res) => {
    if (!req.body.isbn ) {
        console.log("Please include an ISBN");
        return res.send({
            success: false
        });
    } else {
        const host = req.get('host');
        Book.create({
            isbn: req.body.isbn,
            title: req.body.title,
            author: req.body.author
        }, (err, book) => {
            if (err) {
                console.log('CREATE error: ' + err);
                res.status(500).send('Error')
            } else {
                res.status(200).json(book)
            }
        })
    }
})

apiRouter.get('/book/:isbn', (req, res) => {
    Book.findById(req.params.isbn, (err, book) => {
        if (err) {
            console.log('RETRIEVE error: ' + err);
            res.status(500).send('Error');
        } else if (book) {
            res.status(200).json(book)
        } else {
            res.status(404).send('Item not found')
        }
    })
})

apiRouter.get('/books', (req, res) => {
    const books = Book.find({}, (err, books) => {
        if (err) {
            console.log('RETRIEVE error: ' + err);
            res.status(500).send('Error');
        } else if (books) {
            res.status(200).json(books);
        }
    })
})

export default apiRouter;
