config = require(__dirname + "/../config")("test")
expect = require("expect.js")
shortener = require("../models/shortener")(config)

describe "Shortener", ->
  input =
    url: "http://google.com"
    id: "abc"

  output =
    errors:
      not_found: "Id not found."
      invalid: "Url not valid."

  after (done) ->
    redis = require("redis-url").connect(config.redis)
    redis.flushall done
    return

  describe "findById()", ->
    it "returns JSON data when id is not found", (done) ->
      shortener.create input.url, ((result) ->
        shortener.findById result.id, ((data) ->
          expect(data.url).to.equal result.url
          expect(data.id).to.equal result.id
          return
        ), (err) ->

          # this shouldn't be called because id exists
          throw errreturn
        return
      ), (err) ->

        # this shouldn't be called because input is valid
        throw errreturn
      done()
      return

    it "returns JSON error when id is not found", (done) ->
      shortener.findById "wrong", ((data) ->
        # this shouldn't be called because id doesn't exists
        throw datareturn
      ), (err) ->
        expect(err.message).to.equal output.errors.not_found
        return
      done()
      return
    return

  describe "create()", ->
    it "returns JSON data when url is valid", (done) ->
      shortener.create input.url, ((data) ->
        expect(data.url).to.equal input.url
        expect(data.id).to.exist
        return
      ), (err) ->
        # this shouldn't be called because input is valid
        throw errreturn
      done()
      return

    it "returns JSON error when url is not valid", (done) ->
      shortener.create "wrong", ((data) ->
        # this shouldn't be called because input is not valid
        throw datareturn
      ), (err) ->
        expect(err.message).to.equal output.errors.invalid
        return
      done()
      return
    return
  return
