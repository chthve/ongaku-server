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
      consumerKey: 'hOqgGkAKtjmfpFYvNhjb',
      consumerSecret: 'vgbWmkBoIOkDSxQOeuJFCqIMOBPSuiUf',
      callbackURL: 'http://localhost:3001/auth/provider/callback',
    },
    function (token, tokenSecret, profile, done) {
      db.User.findOrCreate({
        where: { token, tokenSecret },
      }).then((err, user) => {
        console.log(err, user);
        done(err, user);
      });
    }
  )
);

module.exports = {
  passport,
};
