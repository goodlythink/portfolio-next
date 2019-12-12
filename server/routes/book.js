const express = require('express');
const router = express.Router();

const bookCtrl = require('../controllers/books')

router.post('', bookCtrl.saveBook)

router.get('', bookCtrl.getBooks)

router.patch('/:id', bookCtrl.updateBook)

router.delete('/:id', bookCtrl.deleteBook)

module.exports = router;