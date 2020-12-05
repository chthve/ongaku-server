const { Strategy } = require('passport-discogs');
const db = require('../models');

const initialize = (passport) => {
  async function authenticateUser(token, tokenSecret, profile, done) {
    const { id, username, resource_url } = profile._json;
    try {
      const user = await db.User.findByPk(id, {
        include: [
          { model: db.Post, as: 'posts' },
          { model: db.Channel, as: 'channels' },
        ],
      });
      if (user) {
        // update a user as it may have a different token or id
        done(null, user);
      } else {
        const newUser = await db.User.create({
          id,
          username,
          token,
          tokenSecret,
          resourceUrl: resource_url,
        });
        newUser.posts = [];
        newUser.channels = [];
        console.log('new user', newUser)
        done(null, newUser);
      }
    } catch (e) {
      done(true, false, e);
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
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
};

module.exports = {
  initialize,
};
