const express = require('express');
const bodyParser = require("body-parser");
const route = require('./routes/')
const app = express();

const Port = process.env.Port || 8080;

app.use('/', route);

app.listen(Port, ()=> console.log('Server Started'));