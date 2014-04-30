'use strict';

// Main setup
const
  config = require('./config'),
  express = require('express'),
  path = require('path'),
  favicon = require('static-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  flash = require('express-flash'),
  app = express(),
  redis = require('redis').createClient(config.redis.port, config.redis.host),
  env = app.get('env');

// Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'keyboard cat', key: 'sid', cookie: {maxAge: 60000}}));
app.use(flash());

// Controllers
require('./controllers/main')(app, redis);

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers
redis.on("error", function (err) {
  console.log("Redis error: " + err);
});

// Render the stack trace
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

module.exports = app;
