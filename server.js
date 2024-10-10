const express = require('express');
// const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();

const route = require('./routes/');
const contactsRoute = require('./routes/contacts');

app.use('/', route);
app.use('/contacts', contactsRoute);

const Port = process.env.Port || 3000;

mongodb.initDb((err) => {
    if(err) {
        console.log(err)
    }
    else {
        app.listen(Port, ()=> {console.log(`Database is listening and node Runing on Port ${Port}`)});
    }
})