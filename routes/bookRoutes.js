const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const { isLoggedIn, isAdmin } = require('../middleware/authMiddleware');

// ----- List all books (any logged-in user), with optional search -----
router.get('/', isLoggedIn, async (req, res) => {
  try {
    const search = req.query.search || '';
    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { author: { $regex: search, $options: 'i' } }
          ]
        }
      : {};

    const books = await Book.find(query);
    res.render('dashboard', { books, search });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not load books');
    res.redirect('/');
  }
});

// ----- Show "add book" form (admin only) -----
router.get('/add', isLoggedIn, isAdmin, (req, res) => {
  res.render('addBook');
});

// ----- Handle "add book" submission (admin only) ----
router.post('/add', isLoggedIn, isAdmin, async (req, res) => {
  try {
    const { title, author, category } = req.body;
    await Book.create({ title, author, category });
    req.flash('success', 'Book added successfully');
    res.redirect('/books');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not add book');
    res.redirect('/books/add');
  }
});

// ----- Show "edit book" form (admin only) -----
router.get('/edit/:id', isLoggedIn, isAdmin, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.render('editBook', { book });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Book not found');
    res.redirect('/books');
  }
});

// ----- Handle "edit book" submission (admin only) -----
router.post('/edit/:id', isLoggedIn, isAdmin, async (req, res) => {
  try {
    const { title, author, category } = req.body;
    await Book.findByIdAndUpdate(req.params.id, { title, author, category });
    req.flash('success', 'Book updated successfully');
    res.redirect('/books');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not update book');
    res.redirect('/books');
  }
});

// ----- Delete a book (admin only) -----
router.post('/delete/:id', isLoggedIn, isAdmin, async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    req.flash('success', 'Book deleted');
    res.redirect('/books');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not delete book');
    res.redirect('/books');
  }
});

// ----- Issue a book to the logged-in user -----
router.post('/issue/:id', isLoggedIn, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book.available) {
      req.flash('error', 'Book is already issued');
      return res.redirect('/books');
    }
    book.available = false;
    book.issuedTo = req.session.user.name;
    await book.save();
    req.flash('success', `You issued "${book.title}"`);
    res.redirect('/books');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not issue book');
    res.redirect('/books');
  }
});

// ----- Return a book -----
router.post('/return/:id', isLoggedIn, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    book.available = true;
    book.issuedTo = null;
    await book.save();
    req.flash('success', `You returned "${book.title}"`);
    res.redirect('/books');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not return book');
    res.redirect('/books');
  }
});

module.exports = router;