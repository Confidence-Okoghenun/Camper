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
  image: 'https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144393f5c17ca3edb2_340.jpg'},
  {name: 'Montana Creek',
  image: 'https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144393f5c17ca3edb2_340.jpg'},
  {name: 'Snake Island',
  image: 'https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144393f5c17ca3edb2_340.jpg'},
  {name: 'Salmon Creek',
  image: 'https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144393f5c17ca3edb2_340.jpg'},
  {name: 'Montana Creek',
  image: 'https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144393f5c17ca3edb2_340.jpg'},
  {name: 'Snake Island',
  image: 'https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144393f5c17ca3edb2_340.jpg'},
  {name: 'Salmon Creek',
  image: 'https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144393f5c17ca3edb2_340.jpg'},
  {name: 'Montana Creek',
  image: 'https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144393f5c17ca3edb2_340.jpg'},
  {name: 'Snake Island',
  image: 'https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144393f5c17ca3edb2_340.jpg'},
  {name: 'Banana Island',
  image: 'https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144393f5c17ca3edb2_340.jpg'}
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