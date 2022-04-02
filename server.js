const express = require('express');
const path = require('path');
const AWS = require('aws-sdk');
const favicon = require('serve-favicon');
const logger = require('morgan');
require('dotenv').config();
require('./config/database.js');

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/all-experiences', require('./routes/api/allExperiences'));
app.use(require('./config/auth'));
app.use('/api/experiences', require('./routes/api/experiences'));
app.use('/api/bookings', require('./routes/api/bookings'));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// configure the keys for accessing AWS
AWS.config.update({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
});

const port = process.env.PORT || 3001;

app.listen(port, function() {
    console.log(`Express app running on port ${port}`)
});