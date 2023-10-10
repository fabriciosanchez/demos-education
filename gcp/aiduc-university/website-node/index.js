// Incluing components needed to the app
const express = require('express');
const axios = require('axios');

// Instantiating express webserver
const app = express();

// Defining body response format (parse)
app.use(express.json());

// Configures static files for the website
app.use(express.static('public'));

// Configure view engine
app.set('view engine', 'ejs');

// Defining web routes
app.get('/', async(req, res) => {
    //const response = await axios.get('https://api.github.com/users');
    //res.render('layout', { page: 'index', userGit: response.data});
    res.render('layout', { page: 'index' });
});

app.get('/about', async(req, res) => {
    res.render('layout', { page: 'about'});
});

app.get('/contact', async(req, res) => {
    res.render('layout', { page: 'contact'});
});

app.post('/contact', async(req, res) => {
    res.render('layout', { page: 'contact'});
});

// Defining api call routes
// app.get('/git', async(req, res) => {
//     const response = await axios.get('https://api.github.com/users');
//     res.json(response.data);
// });

app.listen(3000);