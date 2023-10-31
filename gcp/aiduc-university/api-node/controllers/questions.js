// Creates the request router
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const axios = require('axios');
const path = require('path');

// Importing middlewares
const auth = require('../middlewares/auth');

// Importing data models
const usersModel = require('../models/users');

// Route: generate
router.post('/generate', auth, async(req, res) => {
    try {
        const user = await usersModel.findOne({ _id: req.userId });
        if(!user)
        {
            return res.status(401).json( { message: 'Unauthorized.' });
        }

        // If authorized, calls Function API in Google Cloud that generates questions
        // This call assume a Function has been configured in the backend on Google Cloud
        const url = `https://${process.env.FUNCTION_FQDN}.cloudfunctions.net/createQuestions`

        const { context } = req.body;

        const response = await axios.post(url, {
            prompt: context
        });

        const { data } = response;

        const questionsAnswers = data.response_text.result.split(/\r?\n/);
        const finalQuestionsAnswers = questionsAnswers.filter(e => e);

        res.json(finalQuestionsAnswers)

    } catch (error) {
        return res.status(500).json( { message: 'Error processing the call.' });
    }
});

module.exports = router;