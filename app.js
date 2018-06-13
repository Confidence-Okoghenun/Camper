let express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose')
  Campground = require('./models/campground'),
  seedDB = require('./seeds'),
  Comment = require('./models/comment')
  passport = require('passport'),
  localStrategy = require('passport-local'),
  passportLocalMongoose = require('passport-local-mongoose'),
  expressSession = require('express-session'),
  User = require('./models/user'),

  commentRoutes = require('./routes/comments'),
  campgroundRoutes = require('./routes/campground'),
  authRoutes = require('./routes/index');

mongoose.connect('mongodb://localhost/camper');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + "/public"));
// seedDB();
app.use(require("express-session")({
  secret: 'I love you',
  resave: false,
  saveUninitialized: false
})); 
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});
app.use(authRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('landing');
});









app.get('*', (req, res) => {
  res.send('The page you are looking for does not exist');
});
 
app.listen(8888, () => {
  console.log('Server is listening at port 8888');
})