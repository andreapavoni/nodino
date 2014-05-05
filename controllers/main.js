'use strict';

module.exports = function(config) {
  var shortener = require(__dirname + '/../models/shortener')(config);

  return {
    index: function(req, res) {
      var host = req.protocol + '://' + req.host;
      res.render('index', {host: host});
    },

    create: function(req, res) {
      shortener.create(req.body.url, function(data) {
        res.json({error: null, data: data});
      }, function(err) {
        res.json({error: err.message, data: null});
      });
    },

    show: function(req, res) {
      shortener.findById(req.params.id, function(data) {
        res.redirect(data.url);
      }, function(err) {
        res.status(404);
        res.render('error', {
          message: err.message,
          error: err
        });
      });
    }
  };

}
