const express = require('express');
const bodyParser = require("body-parser")
const app = express();

const Port = process.env.Port || 8080;

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(Port, ()=> console.log('Server Started'))