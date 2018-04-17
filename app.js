const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('./config/config');

const indexRouter = require('./routes/index');
const kittiesRouter = require('./routes/kitties');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets')));

if (config.corsAllowOrigin) {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', config.corsAllowOrigin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
}

app.use('/api/kitties', kittiesRouter);
app.use('/', indexRouter);

module.exports = app;
