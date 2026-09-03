// server.js

require('dotenv').config(); // loads variables from .env into process.env

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');

const app = express();

// ----- Connect to MongoDB -----
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// ----- View engine setup -----
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ----- Middleware -----
app.use(express.urlencoded({ extended: true })); // parses form data
app.use(express.json()); // parses JSON data
app.use(express.static(path.join(__dirname, 'public'))); // serves CSS/JS/images

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

// Make user + flash messages available in all views automatically
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// ----- Routes -----
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

app.use('/', authRoutes);
app.use('/books', bookRoutes);

// ----- Home route (optional simple redirect) -----
app.get('/', (req, res) => {
  res.redirect('/login');
});

// ----- Start server -----
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});