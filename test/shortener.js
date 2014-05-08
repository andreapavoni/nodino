'use strict';

var
  config = require(__dirname + '/../config')('test'),
  expect = require('expect.js'),
  shortener = require('../models/shortener')(config);

describe('Shortener', function() {
  var input = {url: 'http://google.com', id: 'abc'};

  var output = {
    errors: {
      not_found: 'Id not found.',
      invalid: 'Url not valid.'
    }
  };

  after(function(done) {
    var redis = require('redis-url').connect(config.redis);
    redis.flushall(done);
  });

  describe('findById()', function() {
    it('returns JSON data when id is not found', function(done) {
      shortener.create(input.url, function(result) {
        shortener.findById(result.id, function(data) {
          expect(data.url).to.equal(result.url);
          expect(data.id).to.equal(result.id);
        }, function(err) {
          // this shouldn't be called because id exists
          throw err;
        });
      }, function(err){
        // this shouldn't be called because input is valid
        throw err;
      });
      done();
    });

    it('returns JSON error when id is not found', function(done) {
      shortener.findById('wrong', function(data) {
        // this shouldn't be called because id doesn't exists
        throw data;
      }, function(err) {
        expect(err.message).to.equal(output.errors.not_found);
      });
      done();
    });
  });

  describe('create()', function() {
    it('returns JSON data when url is valid', function(done) {
      shortener.create(input.url, function(data) {
        expect(data.url).to.equal(input.url);
        expect(data.id).to.exist;
      }, function(err){
        // this shouldn't be called because input is valid
        throw err;
      });
      done();
    });

    it('returns JSON error when url is not valid', function(done) {
      shortener.create('wrong', function(data) {
        // this shouldn't be called because input is not valid
        throw data;
      }, function(err) {
        expect(err.message).to.equal(output.errors.invalid);
      });
      done();
    });
  });

});
