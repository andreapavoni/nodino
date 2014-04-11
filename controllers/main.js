'use strict';

module.exports = function(router) {
  router.get('/', function(req, res) {
    res.json(200, {'hello': 'world'});
  });

  router.get('/api/:name', function(req, res) {
    res.json(200, {'hello': req.params.name});
  });
}
