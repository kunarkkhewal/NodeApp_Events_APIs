const express = require('express');
const app = express();

const eventRoute = require('./eventRoute');

app.use('/events', eventRoute)

module.exports = app;