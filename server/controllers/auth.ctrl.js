const { discogStrategy } = require('../auth');

const { _oauth } = discogStrategy;

const BASE_URL = 'https://api.discogs.com/';

exports.getFromDiscogs = (req, res) => {
  const { url, token, tokenSecret } = req.body;
  _oauth.get(BASE_URL + url, token, tokenSecret, (err, body, r) => {
    if (err) {
      res.status(400).send(err);
    }
    const json = JSON.parse(body);
    console.log(json);
    res.status(200).send(json);
  });
};
