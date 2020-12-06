/* eslint-disable no-console */
const { discogStrategy } = require('../auth');

const { _oauth } = discogStrategy;

const BASE_URL = 'https://api.discogs.com';

exports.getFromDiscogs = (req, res) => {
  const { url, token, tokenSecret } = req.body;
  console.log(url);
  console.log(token);
  console.log(tokenSecret);
  _oauth.get(BASE_URL + url, token, tokenSecret, (err, body) => {
    if (err) {
      res.status(400).send(err);
    }
    const json = JSON.parse(body);
    console.log(json);
    res.status(200).send(json);
  });
};

// middlewares
// isAuthenticated
// isAuthorized
