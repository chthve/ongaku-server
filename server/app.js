const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const app = require('https-localhost')();
const passport = require('passport');
const router = require('./router');
const { initialize } = require('./auth');

// const app = express();

initialize(passport);
app.use(morgan());
app.use(cors());
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(router);

module.exports = app;
