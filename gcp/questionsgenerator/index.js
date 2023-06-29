const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))

// UPDATE THIS SESSION
const PROJECT_ID = process.env.PROJECT_ID || '{YOUR-NUMERICAL-GCP-PROJECT-CODE}';
const MODEL_ID = process.env.MODEL_ID || 'text-bison@001';`` //DON'T CHANGE IT
const TOKEN = process.env.TOKEN || 'Bearer {YOUR-ACCESS-CODE}'

app.get('/', (req, res) => {
    res.render('index', {});
});

app.get('/question', (req, res) => {
    res.render('question', {});
});

app.post('/process', async (req, res) => {
    const url = `https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/us-central1/publishers/google/models/${MODEL_ID}:predict`

    const { quantity, text } = req.body;

    const response = await axios.post(url, {
        instances: [
            {
                content: `Generate ${quantity} questions that test reader comprehension of the following text. Text: ${text} Questions:` //DON'T CHANGE IT
            }
        ],
        parameters: {
            temperature: 0.2,
            maxOutputTokens: 1024,
            topP: 0.8,
            topK: 40
        }
    }, {
        headers: {
            Authorization: TOKEN
        }
    })

    const { data } = response;

    res.json(data)
})

app.listen(process.env.PORT || 3000);