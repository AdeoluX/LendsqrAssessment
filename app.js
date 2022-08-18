require('dotenv').config();
const express = require('express');
const app = express();
const httpStatus = require('http-status');

const { userRoute } = require('./src/routes');
const { errorConverter, errorHandler } = require('./src/middleware/error');
const ApiError = require('./src/utils/ApiError');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user/api/v1', userRoute);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
