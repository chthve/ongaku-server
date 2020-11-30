const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./router');

const app = express();

app.use(morgan());
app.use(cors());
app.use(express.json());

app.use(router);

module.exports = app;
