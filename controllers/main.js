'use strict';

const
  redis = require('redis').createClient(),
  shortener = require('../models/shortener')(redis);

module.exports = function(router) {
  router.get('/', function(req, res) {
    res.render('index');
  });

  router.post('/', function(req, res) {
    shortener.create(req.body.url, function(data) {
      res.redirect('/ok');
    }, function(err) {
      res.redirect('/err');
    });
  });

  router.get('/short/:id', function(req, res) {
    shortener.findById(req.params.id, function(data) {
      res.redirect(data.url);
    }, function(err) {
      res.redirect('/');
    });
  });
};
