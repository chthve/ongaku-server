const passport = require('passport');
const { OAuthStrategy } = require('passport-oauth');
const db = require('../models');

passport.use(
  'provider',
  new OAuthStrategy(
    {
      requestTokenURL: 'https://api.discogs.com/oauth/request_token',
      accessTokenURL: 'https://api.discogs.com/oauth/access_token',
      userAuthorizationURL: 'https://www.discogs.com/oauth/authorize',
      consumerKey: process.env.consumerKey,
      consumerSecret: process.env.consumerSecret,
      callbackURL: process.env.callbackURL,
    },
    function (token, tokenSecret, profile, done) {
      db.User.findOrCreate({
        where: { token, tokenSecret },
      }).then((err, user) => {
        done(err, user);
      });
    }
  )
);

module.exports = {
  passport,
};
