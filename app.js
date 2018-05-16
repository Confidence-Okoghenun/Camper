let app = require('express')(),
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('landing');
});

let campgrounds = [
  {name: 'Salmon Creek',
  image: 'https://image1.com'},
  {name: 'Montana Creek',
  image: 'https://image2.com'},
  {name: 'Snake Island',
  image: 'https://image3.com'},
  {name: 'Banana Island',
  image: 'https://image4.com'}
]
app.get('/campgrounds', (req, res) => {
  res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', (req, res) => {
  let newCamp = {};
  newCamp.name = req.body.name;
  newCamp.image = req.body.image;
  campgrounds.push(newCamp);
  res.redirect('/campgrounds');
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