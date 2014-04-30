'use strict';

module.exports = function(router, redis) {
  var
    shortener = require('../models/shortener')(redis);

  router.get('/', function(req, res) {
    res.render('index');
  });

  router.post('/', function(req, res) {
    shortener.create(req.body.url, function(data) {
      res.json({error: null, data: data});
    }, function(err) {
      res.json({error: err.message, data: null});
    });
  });

  router.get('/:id', function(req, res) {
    shortener.findById(req.params.id, function(data) {
      res.redirect(data.url);
    }, function(err) {
      req.flash('alert', JSON.stringify(err.message));
      res.redirect('/');
    });
  });
};
