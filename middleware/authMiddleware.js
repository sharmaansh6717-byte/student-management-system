function isLoggedIn(req, res, next) {
  if (req.session.user) {
    return next(); // user is logged in, continue to the actual route
  }
  req.flash('error', 'Please log in to continue');
  res.redirect('/login');
}

// Checks if the logged-in user is an admin
function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  req.flash('error', 'Access denied. Admins only.');
  res.redirect('/books');
}

module.exports = { isLoggedIn, isAdmin };