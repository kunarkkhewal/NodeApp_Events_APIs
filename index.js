const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const routes = require('./routes');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.use('/', routes)


const options = {
	definition: {
		openapi: "3.1.0",
		info: {
			title: "Events APIs Documentation",
			version: "1.0.0",
			description: "This is a simple CRUD API application made with Express and documented with Swagger",
			license: {
				name: "MIT",
				url: "https://spdx.org/licenses/MIT.html",
			},
			contact: {
				name: "Kunark Khewal",
				email: 'kunark.khewal88@gmail.com'
			},
		},
		servers: [
			{
				url: "http://localhost:5000",
			},
		],
	},
	apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
	"/api-docs",
	swaggerUi.serve,
	swaggerUi.setup(specs, { explorer: true })
);

app.listen(PORT, () => {
    console.log(`SERVER STARTED ON PORT: ${PORT}`);
})
