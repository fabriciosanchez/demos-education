// Creates the request router
const router = require('express').Router();
const jwt = require('jsonwebtoken');

// Importing middlewares
const auth = require('../middlewares/auth');

// Importing data models
const usersModel = require('../models/users');

// Route: user creation
router.post('/create', async(req, res) => {
    const { name, email, password, userType } = req.body;
    const userExists = await usersModel.exists({ email: email });
    if(userExists)
    {
        return res.status(400).json({ message: 'User already exists. Please, login.' });
    }
    const user = await usersModel.create(
        { 
            name: name, 
            email: email, 
            userType: userType,
            password: password 
        }
    )
    res.json({ message: 'User created.' });
});

// Route: user login
router.post('/login', async(req, res) => {
    const { email, password } = req.body;
    const user = await usersModel.findOne({ email: email });
    if(!user)
    {
        return res.status(400).json( { message: 'User not found. Please, try again.' });
    }
    if(!user.verifyPasswordSync(password))
    {
        return res.status(400).json( { message: 'User not found. Please, try again.' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token: token });
});

// Route: User identity detail
router.get('/me', auth, async(req, res) => {
    try {
        const user = await usersModel.findOne({ _id: req.userId });
        if(!user)
        {
            return res.status(401).json( { message: 'Unauthorized.' });
        }
        res.json({ 
            _id: user._id, 
            name: user.name, 
            email: user.email, 
            userType: user.userType 
        });
    } catch (error) {
        return res.status(401).json( { message: 'Unauthorized.' });
    }
});

module.exports = router;