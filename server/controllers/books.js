const Book = require('../models/book')

exports.getBooks = (req, res) => {
  Book.find({}, (err, allBooks) => {
    if (err) {
      return res.status(422).send(err)
    }

    return res.json(allBooks);
  })
}

exports.saveBook = (req, res) => {
  const bookData = req.body;

  const book = Book(bookData);

  book.save((err, createBook) => {
    if (err) {
      return res.status(422).send(err)
    }

    return res.json(createBook)
  })
}

exports.updateBook = (req, res) => {
  const bookId = req.params.id;
  const bookData = req.body;

  Book.findById(bookId, (err, foundBook) => {
    if (err) {
      return res.status(422).send(err)
    }

    foundBook.set(bookData);
    foundBook.save((err, savedBook) => {
      if (err) {
        return res.status(422).send(err)
      }
      return res.json(savedBook)
    })
  })
}

exports.deleteBook = (req, res) => {
  const bookId = req.params.id;

  Book.deleteOne({ _id: bookId }, (err, deletedBook) => {
    if (err) {
      return res.status(422).send(err)
    }
    return res.json(deletedBook)
  })
}