// Loading config files
require('dotenv').config();

// Incluing components needed to the app
const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');

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
app.get('/questionsGenerator', async(req, res) => {
    res.render('layout', { page: 'questionsGenerator' });
});

app.get('/login', async(req, res) => {
    res.render('layout-login', { page: 'login' });
});

app.listen(3001);