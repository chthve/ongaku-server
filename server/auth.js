const { Strategy } = require('passport-discogs');
const fetch = require('node-fetch');
const db = require('../models');

const initialize = (passport) => {
  function authenticateUser(token, tokenSecret, profile, done) {
    const { id, username, resource_url } = profile._json;
    try {
      const user = db.User.find({ where: { username } });
      if (user) done(null, user);
      db.User.create({
        id,
        username,
        resource_url,
        saved: [],
      });
    } catch (e) {
      done(null, false, e);
    }
  }
  passport.use(
    'provider',
    new Strategy(
      {
        requestTokenURL: 'https://api.discogs.com/oauth/request_token',
        accessTokenURL: 'https://api.discogs.com/oauth/access_token',
        userAuthorizationURL: 'https://www.discogs.com/oauth/authorize',
        consumerKey: 'hOqgGkAKtjmfpFYvNhjb',
        consumerSecret: 'vgbWmkBoIOkDSxQOeuJFCqIMOBPSuiUf',
        callbackURL: '/auth/provider/callback',
      },
      authenticateUser
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    db.User.find({ where: { id } })
      .then((user) => {
        done(null, user);
      })
      .catch((err) => done(err.message));
  });
};

module.exports = {
  initialize,
};
