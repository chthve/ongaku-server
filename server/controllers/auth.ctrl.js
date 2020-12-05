/* eslint-disable no-console */
const { discogStrategy } = require('../auth');

const { _oauth } = discogStrategy;

const BASE_URL = 'https://api.discogs.com';

exports.getFromDiscogs = (req, res) => {
  const { url, token, tokenSecret } = req.body;
  _oauth.get(BASE_URL + url, token, tokenSecret, (err, body) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send(body);
  });
};

exports.postToDiscogs = (req, res) => {
  const { url, token, tokenSecret, postBody, postContentType } = req.body;

  _oauth.post(
    BASE_URL + url,
    token,
    tokenSecret,
    postBody,
    postContentType,
    (err, body) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send(body);
    }
  );
};

exports.putToDiscogs = (req, res) => {
  const { url, token, tokenSecret, postBody, postContentType } = req.body;

  _oauth.put(
    BASE_URL + url,
    token,
    tokenSecret,
    postBody,
    postContentType,
    (err, body) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send(body);
    }
  );
};

exports.deleteFromDiscogs = (req, res) => {
  const { url, token, tokenSecret } = req.body;
  _oauth.delete(BASE_URL + url, token, tokenSecret, (err) => {
    if (err) {
      res.status(400).send(err);
    }
    res.sendStatus(204);
  });
};
