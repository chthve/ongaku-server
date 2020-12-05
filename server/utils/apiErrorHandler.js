/* eslint-disable no-unused-vars */
const ApiError = require('./apiError');

function apiErrorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    res.status(err.code).send(err.message);
  }

  res.status(500).send('Something went wrong!');
}

module.exports = apiErrorHandler;
