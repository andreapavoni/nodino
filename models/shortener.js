'use strict';

var
  validUrl = require('valid-url'),
  config = require(__dirname + '/../config'),
  redis = require('redis-url').connect(config.redis);

var redisKey = 'nodino';
var keyId = function(id) { return (redisKey + '.id|' + id); };

var base62 = function (number) {

  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var encoded = '';

  if (typeof(number) !== 'number' || number === 0) { return '0'; }

  while (number > 0) {
    encoded += chars[number % 62];
    number = Math.floor(number/62);
  }
  return encoded
};

var generateId = function(callback) {
  // I needed a magic number to start the counter and get a nice-looking id.
  // I put my daughter's birth date <3
  var seed = 20130715;
  var counter_key = redisKey + '.counter';

  redis.get(counter_key, function(err, counter) {
    if (counter) {
      redis.incr(counter_key, function(err, newCounter) {
        callback(err, base62(newCounter));
      });
    } else {
      redis.set(counter_key, seed, function(err, data) {
        callback(err, base62(seed));
      });
    }
  });
};

module.exports.findById = function(id, cbOk, cbErr) {
  redis.get(keyId(id), function(err, url) {
    if (url) {
      cbOk({url: url, id: id});
    } else {
      cbErr((new Error('Id not found.')));
    }
  });
};

module.exports.create = function(url, cbOk, cbErr) {
  if (!validUrl.isWebUri(url)) {
    return cbErr((new Error('Url not valid.')));
  }

  generateId(function(err, id) {
    redis.set(keyId(id), url, function (err, data) {
      if (!err) {
        return cbOk({url: url, id: id});
      } else {
        return cbErr(err);
      }
    });
  });
};

