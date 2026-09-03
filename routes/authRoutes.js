const express = require('express');
const router = express.Router();
const User = require('../models/User');

//sign up page
router.get('/signup', (req, res) => {
  res.render('signup');
});

//sign up handling
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check user existence 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash('error', 'Email already registered');
      return res.redirect('/signup');
    }

    // Create a new user (password will be hashed
    // by the pre('save') (hook wrote in User.js)
    const newUser = new User({ name, email, password });
    await newUser.save();

    req.flash('success', 'Account created! Please log in.');
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Something went wrong. Try again.');
    res.redirect('/signup');
  }
});

// login page
router.get('/login', (req, res) => {
  res.render('login');
});

// login handling
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/login');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/login');
    }

    // Save basic user info into the session
    req.session.user = {
      id: user._id,
      name: user.name,
      role: user.role
    };

    req.flash('success', `Welcome back, ${user.name}!`);
    res.redirect('/books');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Something went wrong. Try again.');
    res.redirect('/login');
  }
});

//logout handling
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;