'use strict';

var request = require('superagent');
var expect = require('expect.js');

var host = 'http://localhost:4000';

describe('GET /', function() {
  it('works', function(done) {
    request.get(host).end(function(res){
      expect(res).to.exist;
      expect(res.status).to.equal(200);
      done();
    });
  });
});


describe('POST /', function() {
  it('works', function(done) {
    var url = 'http://google.com';

    request.post(host).send({url: url }).end(function(error, res) {
      expect(res.status).to.equal(200);
      expect(res.body.error).to.equal(null);
      expect(res.body.data.url).to.equal(url);
      expect(res.body.data.id).not.to.be(null);
      done();
    });
  });
});


describe('GET /:id', function() {
  var result;
  var url = 'http://google.com';

  beforeEach(function(done) {
    request.post(host).send({url: url }).end(function(error, res) {
      result = res.body.data.id;
      done();
    });
  });

  it('redirects to URL', function(done) {
    var redirects = [];

    request.get(host + '/' + result).redirects(1).on('redirect', function(res){
      redirects.push(res.headers.location);
    }).end(function(res) {
      expect(res).to.exist;
      expect(redirects[0]).to.equal(url);
      done();
    });
  });
});
