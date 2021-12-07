import path from 'path';
import express from 'express';
import hbs from 'hbs';
import geocode from './utils/geocode.js';
import forecast from './utils/forecast.js';

const __dirname = path.resolve();

//Define paths for Express config
const publicDir = path.join(__dirname, 'public');
const viewsDir = path.join(__dirname, 'templates', 'views');
const partialsDir = path.join(__dirname, 'templates', 'partials');

const app = express();
const port = process.env.PORT || 3000;

// Setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsDir);
hbs.registerPartials(partialsDir);

//Setup static dir to serve
app.use(express.static(publicDir));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Devansh',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Devansh',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'We are here to help you',
    title: 'Help',
    name: 'Devansh',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide address',
    });
  }

  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          forecast: forecastData,
          location,
        });
      });
    }
  );
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({});
  }
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    message: 'Help Artice not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    message: 'Page Not Found',
    name: 'Devansh',
    title: '404',
  });
});

app.listen(port, () => {
  console.log('Server is running');
});
