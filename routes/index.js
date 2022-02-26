const express = require('express');
const app = express();

const eventRoute = require('./eventRoute');

app.use('/', eventRoute)

module.exports = app;