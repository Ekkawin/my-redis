const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9000;

app.get('/', async (req, res) => {
  const userName = req.query.userName || 'Ekkawin';
  const url = `https://api.github.com/users/${userName}`;

  const { data } = await axios.get(url);
  console.log('userName', userName);
  console.log('url', url);
  console.log('user', data);

  res.json({
    data: data,
  });
});

app.listen(PORT, () => {
  console.log('listen to PORT' + PORT);
});
