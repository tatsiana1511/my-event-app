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
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// create S3 instance
const s3 = new AWS.S3();  

// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
    const params = {
      ACL: 'public-read',
      Body: buffer,
      Bucket: process.env.S3_BUCKET,
      ContentType: type.mime,
      Key: `${name}.${type.ext}`,
    };
    return s3.upload(params).promise();
};


const port = process.env.PORT || 3001;

app.listen(port, function() {
    console.log(`Express app running on port ${port}`)
});