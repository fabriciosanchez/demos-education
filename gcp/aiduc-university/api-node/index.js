// Loading config files
require('dotenv').config();

// Incluing components needed to the app
const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');

// Instantiating express webserver
const app = express();

// Enables cors
app.use(cors());

// Starting db connection
mongoose.connect(process.env.DB_URL);

// Defining body response format (parse)
app.use(express.json());

// Registering routes endpoints
app.use('/users', require('./controllers/users'));
app.use('/questions', require('./controllers/questions'));

app.get('/temp', async(req, res) => {
    // const user = await usersModel.create({ name: 'Fabricio', email: 'flscc2002@yahoo.com.br', password: '123' })
    // const users = await usersModel.find({ name: 'Fabricio' });
    // const users = await usersModel.findOne({ name: 'Fabricio' });
    // const users = await usersModel.update(
    //     { 
    //         name: 'Fabricio' 
    //     }, 
    //     { 
    //         $set: { email: 'fabricio.sanchez@gmail.com' } 
    //     }
    // );
    // const users = await usersModel.updateOne(
    //     { 
    //         name: 'Fabricio' 
    //     }, 
    //     { 
    //         $set: { email: 'fabricio.sanchez@gmail.com' } 
    //     }
    // );
    //const users = await usersModel.delete({ name: 'Fabricio' });
    res.json({ users });
});

app.listen(3002);