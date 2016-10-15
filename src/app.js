const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const path = require('path');

let app = express();
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || '6969');

app.use(logger('dev'));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.static(path.join(__dirname, '..', 'bower_components')));
app.use(express.static(path.join(__dirname, '..', 'compat')));

app.use('/', require('../routes/index'));

module.exports = app;
