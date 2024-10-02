const express = require('express');
const bodyParser = require("body-parser")
const app = express();

const Port = process.env.Port || 8080;

app.use('/', require('./routes/'))

app.listen(Port, ()=> console.log('Server Started'))