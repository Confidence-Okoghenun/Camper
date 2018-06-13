let express = require('express'),
Campground = require('../models/campground'),
  router = express.Router();

router.get('/', (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    if (err) console.log('***AN ERROR HAS OCCURED!***', err);
    else {
      res.render('campgrounds/index', {
        campgrounds: allCampgrounds
      });
      console.log('CAMPGROUNDS HAS BEEN RENDERED!');
    }
  })
});

router.post('/', isLoggedIn, (req, res) => {
  let author = {
    id : req.user._id,
    username : req.user.username
  };
  req.body.campground.author = author;
  Campground.create(req.body.campground, (err, newCampground) => {
    if (err) console.log('***AN ERROR HAS OCCURED!***', err);
    else {
      console.log('A NEW CAMPGROUND HAS BEEN SUCESSFULLY CREATED!', newCampground)
      res.redirect('/campgrounds');
    }
  })
}); 

router.get('/new', isLoggedIn, (req, res) => {
  res.render('campgrounds/new')
});

router.get('/:id', (req, res) => {
  Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
    if (err) console.log('ERROR WITH CAMP SHOW');
    else {
      res.render('campgrounds/show', {
        campground: foundCampground
      });
    }
  })
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;