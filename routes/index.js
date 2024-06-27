const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

router.get('/profile', ensureAuth, (req, res) => {
  res.render('profile', { user: req.user });
});

function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/');
  }
}

module.exports = router;
