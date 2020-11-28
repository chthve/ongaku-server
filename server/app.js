const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(morgan());
app.use(cors());
app.use(express.json());

module.exports = app;
