var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors')

// Variables
const PORT = 8083;
const URL = "mongodb://localhost:27017/team";
const OPTIONS = { useNewUrlParser: true };

// Express Application
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', require('./routes'));

mongoose.connect(URL, OPTIONS)
    .then(() => {
        console.log('Connected to mongoDB...');
    })
    .catch(err => {
        console.log('Error :', err);
    })

app.listen(PORT, function () {
    console.log("Application is on port:", PORT);
})