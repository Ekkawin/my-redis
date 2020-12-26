const express = require('express');
const axios = require('axios');
const redis = require('redis');

const app = express();
const PORT = 9000;

const redisClient = redis.createClient();
redisClient.on('error', function (error) {
  console.error(error);
});

app.get('/', async (req, res) => {
  const userName = req.query.userName || 'Ekkawin';
  const url = `https://api.github.com/users/${userName}`;

  redisClient.get(userName, async (err, reply) => {
    if (reply) {
      console.log('reply', reply);
      return res.json(JSON.parse(reply));
    }
    if (err) {
      console.error(err);
      throw new Error('new Error');
    }
    const { data } = await axios.get(url);
    redisClient.setex(userName, 60, JSON.stringify(data));
    return res.json(data);
  });

  console.log('userName', userName);
  console.log('url', url);
});

app.listen(PORT, () => {
  console.log('listen to PORT' + PORT);
});
