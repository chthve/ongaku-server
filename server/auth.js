/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
const { Strategy } = require('passport-discogs');
const db = require('../models');

async function authenticateUser(token, tokenSecret, profile, done) {
  const { id, username, resource_url } = profile._json;
  try {
    const user = await db.User.findByPk(id);
    if (user) {
      user.token = token;
      user.tokenSecret = tokenSecret;
      await user.save();
      done(null, user);
    } else {
      const newUser = await db.User.create({
        id,
        username,
        token,
        tokenSecret,
        resourceUrl: resource_url,
      });

      done(null, newUser);
    }
  } catch (e) {
    done(true, false, e);
  }
}

const discogStrategy = new Strategy(
  {
    requestTokenURL: 'https://api.discogs.com/oauth/request_token',
    accessTokenURL: 'https://api.discogs.com/oauth/access_token',
    userAuthorizationURL: 'https://www.discogs.com/oauth/authorize',
    consumerKey: 'hOqgGkAKtjmfpFYvNhjb',
    consumerSecret: 'vgbWmkBoIOkDSxQOeuJFCqIMOBPSuiUf',
    callbackURL: '/auth/provider/callback',
  },
  authenticateUser
);

const initialize = (passport) => {
  passport.use('provider', discogStrategy);
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    db.User.findByPk(id)
      .then((user) => {
        done(null, user);
      })
      .catch((e) => {
        done(true, null, e);
      });
  });
};

module.exports = {
  initialize,
  discogStrategy,
};
