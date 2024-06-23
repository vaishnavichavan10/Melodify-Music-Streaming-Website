const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.get('/audio', async (req, res) => {
  const videoUrl = req.query.url;
  if (!ytdl.validateURL(videoUrl)) {
    return res.status(400).send('Invalid YouTube URL');
  }

  const info = await ytdl.getInfo(videoUrl);
  const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
  res.json({ audioUrl: format.url });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
