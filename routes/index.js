let express = require('express'),
  passport = require('passport'),
   User = require('../models/user'),
  router = express.Router();

router.get('/register', (req, res) => {
  res.render('register', {
    currentUser: req.user
  });
});

router.post('/register', (req, res) => {
  User.register(new User({
    username: req.body.username
  }), req.body.password, (err, user) => {
    if (err) {
      console.log('error occured while logging in');
      return res.render('register', {
        currentUser: req.user
      })
    }
    passport.authenticate('local')(req, res, () => res.redirect('/campgrounds'))
  })
});

router.get('/login', (req, res) => {
  res.render('login', {
    currentUser: req.user
  });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  failureRedirect: '/login'
}), (req, res) => {

});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/campgrounds');
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;