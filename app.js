const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  let beersFromAPI = [];
  const PunkAPIWrapper = require('punkapi-javascript-wrapper');
  const punkAPI = new PunkAPIWrapper();

  punkAPI.getBeers()
    .then((beer) => {
      const beersFromAPI = beer.map((item) => {
        return {
          name: item.name,
          image: item.image_url,
          description: item.description,
          tagline: item.tagline,
        };
      });
     res.render('beers', {beers: beersFromAPI})
    })
    .catch((error) =>{
      console.error(error)
      res.status(500).send('Error fetching beers.')
    });
});



app.get('/random-beer', (req, res) => {

  const PunkAPIWrapper = require('punkapi-javascript-wrapper');
  const punkAPI = new PunkAPIWrapper()

  punkAPI.getRandom()
    .then((beer) => {
      const randomIndex = Math.floor(Math.random() * beer.length)
      const randomBeer = {
        name: beer[randomIndex].name,
        image_url: beer[randomIndex].image_url,
        description: beer[randomIndex].description,
        tagline: beer[randomIndex].tagline,
        food_pairing: beer[randomIndex].food_pairing,
        brewers_tips: beer[randomIndex].brewers_tips,
      };
      res.render('random-beer', {beer: randomBeer})
    })
  .catch((error) => {
    console.error(error)
    res.status(500).send('Error fetching beers.')
  });

});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
