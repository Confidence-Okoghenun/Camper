let app = require('express')(),
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/campgrounds', (req, res) => {
  let campgrounds = [
    {name: 'Salmon Creek',
    image: 'https://image.com'},
    {name: 'Montana Creek',
    image: 'https://image.com'},
    {name: 'Snake Island',
    image: 'https://image.com'},
    {name: 'Banana Island',
    image: 'https://image.com'}
  ]
  res.render('campgrounds', {campgrounds: campgrounds});
});

app.get('*', (req, res) => {
  res.send('The page you are looking for does not exist');
});

app.listen(8888, () => {
  console.log('Server is listening at port 8888');
})