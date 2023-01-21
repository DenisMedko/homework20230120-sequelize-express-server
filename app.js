const express = require('express');
const router = require('./routes');

const app = express();
app.use('/api', express.json(), router);

module.exports = app;