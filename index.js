const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const routes = require('./routes');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.use('/', routes)

app.listen(PORT, () => {
    console.log(`SERVER STARTED ON PORT: ${PORT}`);
})
