'use strict';

module.exports = function (redis) {
  var shortener = require('../models/shortener')(redis);

  return {
    index: function index(req, res) {
      res.render('index');
    },

    create: function login(req, res) {
      shortener.create(req.body.url, function(data) {
        res.json({error: null, data: data});
      }, function(err) {
        res.json({error: err.message, data: null});
      });
    },

    show: function login(req, res) {
      shortener.findById(req.params.id, function(data) {
        res.redirect(data.url);
      }, function(err) {
        req.flash('alert', JSON.stringify(err.message));
        res.redirect('/');
      });
    }
  };
}

