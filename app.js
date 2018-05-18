let app = require('express')(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/camper');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('landing');
});

let campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

let Campground = mongoose.model('Campground', campgroundSchema);
// Campground.create({
//       name: 'Montana Creek',
//       image: 'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1c80f31bb4040015d51db663252fbd30&auto=format&fit=crop&w=500&q=60'
//     }, (err, camp) => {
//   if(err) console.log('***AN ERROR HAS OCCURED!***', err);
//   else console.log(camp);
// });

app.get('/campgrounds', (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    if (err) console.log('***AN ERROR HAS OCCURED!***', err);
    else {
      res.render('campgrounds', {
        campgrounds: allCampgrounds
      });
      console.log('CAMPGROUNDS HAS BEEN RENDERED!');
    }
  })
});

app.post('/campgrounds', (req, res) => {
  Campground.create({
    name: req.body.name,
    image: req.body.image
  }, (err, newCampground) => {
    if (err) console.log('***AN ERROR HAS OCCURED!***', err);
    else {
      console.log('A NEW CAMPGROUND HAS BEEN SUCESSFULLY CREATED!', newCampground)
      res.redirect('/campgrounds');
    }
  })
});

app.get('/campgrounds/new', (req, res) => {
  res.render('new')
});

app.get('*', (req, res) => {
  res.send('The page you are looking for does not exist');
});

app.listen(8888, () => {
  console.log('Server is listening at port 8888');
})