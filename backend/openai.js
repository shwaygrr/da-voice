const express = require('express');
const OpenAI = require('openai');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/bio', async (req, res) => {
  const { name } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { "role": "system", "content": "You are a helpful assistant." },
        { "role": "user", "content": `Write a short 3 sentence and neutral bio for ${name} that is suitable for an app dedicated to educating minority communities about their local representatives. Include both positive aspects of their work and any criticisms they may have faced, focusing on their policies, community engagement, and contributions. Highlight how this representative impacts local elections and issues that affect minority communities directly. Give plain text, not markdown` }
      ],
    });

    res.json({ bio: completion.choices[0].message.content.trim() });
  } catch (error) {
    console.error("Error fetching bio:", error);
    res.status(500).json({ error: 'Failed to fetch bio' });
  }
});

app.post('/api/summarize-election', async (req, res) => {
  const { election } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { "role": "system", "content": "You are a helpful assistant." },
        { "role": "user", "content": `Summarize the key details of the ${election} election in a concise 3 sentence, neutral, and informative manner for an app aimed at educating minority communities about local elections. Include information about candidates, major policies or issues at stake, voting deadlines, and any important changes affecting the election (such as voting locations or eligibility requirements). The summary should be brief, factual, and highlight how the election might impact local communities, especially minorities, to encourage voter participation. Give plain text, not markdown` }
      ],
    });

    res.json({ bio: completion.choices[0].message.content.trim() });
  } catch (error) {
    console.error("Error fetching bio:", error);
    res.status(500).json({ error: 'Failed to fetch bio' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});