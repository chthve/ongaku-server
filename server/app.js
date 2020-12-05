const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const router = require('./router');

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

app.use(router);

module.exports = app;
