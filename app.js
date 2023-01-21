const express = require('express');
const router = require('./routes');
const { basicErrorHandler } = require('./errorHandlers');

const app = express();
app.use(express.json());
app.use(router);
app.use(basicErrorHandler);

module.exports = app;