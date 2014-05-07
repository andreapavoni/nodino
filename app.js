'use strict';

// Main setup
const
  express = require('express'),
  path = require('path'),
  favicon = require('static-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  httpErrors = require('./middlewares/http-errors'),
  app = express(),
  env = app.get('env'),
  compress = require('compression')(),
  config = require('./config')(env);


// Middlewares
app.use(favicon());
app.use(logger());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(compress);
app.use(session({secret: config.secret, key: 'session_id', cookie: {maxAge: 60000}}));
app.use(express.static(path.join(__dirname, 'public')));

// Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Controllers
var mainController = require('./controllers/main')(config);

// Routes
app.get('/', mainController.index);
app.get('/:id', mainController.show);
app.post('/', mainController.create);

// Error handlers
app.use(httpErrors.notFound);
app.use(httpErrors.error);

module.exports = app;
