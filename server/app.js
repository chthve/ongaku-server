/* eslint-disable new-cap */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const xss = require('xss-clean');
const router = require('./router/router');
const apiErrorHandler = require('./utils/apiErrorHandler');
const ApiError = require('./utils/apiError');

const app = express();

app.use(
  cookieSession({
    name: 'session',
    keys: ['ongaku'],
  })
);
app.use(cookieParser());
app.use(morgan());
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT.PATCH,POST,DELETE',
    credentials: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(xss());

app.use(router);

app.all('*', (req, res, next) => {
  return next(
    ApiError.notFound(`Can't find ${req.originalUrl} on this server`)
  );
});

app.use(apiErrorHandler);

module.exports = app;
