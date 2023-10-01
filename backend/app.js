const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
const PORT = 8080;
require('dotenv').config();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.post('/get-title', async (req, res) => {
  const _prompt = req.body.data;
  console.log('entered prompt - ', _prompt);

  const prompt = `I am planning to work on a research project. I do not have experience in writing research papers, and I need to start with this. Please help me write only the abstract in 150-200 words. The research idea is - ${_prompt} The format of the result should strictly be Title: 'the title' \n\n\n Abstract: 'the abstract'`;

  if (!_prompt) {
    res.status(400).json({ error: 'Prompt missing' });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GPT_KEY}`,
        },
      }
    );

    const generatedText = JSON.stringify(response.data);

    console.log(generatedText);
    res.status(201).json({ result: generatedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.post('/get-keywords', async (req, res) => {
  const _abstract = `Give me 5 keywords out of the following abstract - ${req.body.abstractData}`;
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: _abstract }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GPT_KEY}`,
        },
      }
    );

    const generatedKeywords = response.data.choices[0].message.content
      .split('\n')
      .map((keyword) => ({ keyword: keyword.trim() }));

    console.log(generatedKeywords);
    res.status(201).json({ result: generatedKeywords });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
