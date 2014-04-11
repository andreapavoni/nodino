'use strict';

// Main setup
const
  redis = require('redis').createClient(),
  express = require('express'),
  path = require('path'),
  favicon = require('static-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  app = express();

// Controllers
const
  main_controller = require('./controllers/main')(app);

// Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middlewares
app.use(favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

// Static assets
app.use(express.static(path.join(__dirname, 'public')));

// Routing
app.use('/', main_controller);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// Error handlers

redis.on("error", function (err) {
  console.log("Redis error: " + err);
});

// development env:
if (app.get('env') === 'development') {
  app.use(logger('dev'));

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production env
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
