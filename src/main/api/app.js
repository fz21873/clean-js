const express = require('express');
const { routes } = require('./routes');
const app = express();

//CONFIG
app.use(express.json());

// ROUTES
app.use(routes);

module.exports = {app}
