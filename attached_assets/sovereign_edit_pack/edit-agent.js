
const express = require('express');
const fs = require('fs');
const { Configuration, OpenAIApi } = require('openai');
const simpleGit = require('simple-git');
require('dotenv').config();

const app = express();
const port = 3001;
const git = simpleGit();

app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/edit-agent', async (req, res) => {
  const { prompt, filepath } = req.body;

  try {
    const currentContent = fs.readFileSync(filepath, 'utf-8');
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a code editor bot. Only return modified file content. No commentary.' },
        { role: 'user', content: `Current file content:\n${currentContent}` },
        { role: 'user', content: `Edit request:\n${prompt}` },
      ],
    });

    const newContent = response.data.choices[0].message.content;
    fs.writeFileSync(filepath, newContent);
    await git.add(filepath);
    await git.commit(`AI Edit: ${prompt}`);
    res.json({ status: 'success', message: 'File edited and committed.', newContent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Edit agent running on http://localhost:${port}`);
});
