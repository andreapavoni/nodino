'use strict';

module.exports = function(config) {
  var shortener = require(__dirname + '/../models/shortener')(config);

  return {
    index: function(req, res) {
      res.render('index');
    },

    create: function(req, res) {
      shortener.create(req.body.url, function(data) {
        var payload = {
          url: data.url,
          id: data.id,
          host: req.protocol + '://' + req.host
        };

        res.json({error: null, data: payload});
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
          message: '404: Not found.',
          error: err
        });
      });
    }
  };

}
