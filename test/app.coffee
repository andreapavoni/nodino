process.env.NODE_ENV = "test"
request = require("supertest")
expect = require("expect.js")
app = require(__dirname + "/../app")
config = require(__dirname + "/../config")(app.get("env"))

describe "Web app", ->
  after (done) ->
    redis = require("redis-url").connect(config.redis)
    redis.flushall()
    done()
    return

  describe "GET /", ->
    it "works", (done) ->
      request(app).get("/").expect 200, done
      return
    return

  describe "POST /", ->
    it "responds with JSON data when URL is valid", (done) ->
      url = "http://google.com"
      request(app).post("/").send(url: url).expect(200).end (err, res) ->
        expect(res.body.error).not.to.exist
        expect(res.body.data.url).to.equal url
        expect(res.body.data.id).to.exist
        expect(res.body.data.host).to.exist
        done()
        return
      return
    return

  it "responds with JSON error when URL is not valid", (done) ->
    url = "wrong"
    request(app).post("/").send(url: url).expect(200).end (err, res) ->
      expect(res).to.exist
      expect(res.status).to.equal 200
      expect(res.body.error).to.exist
      expect(res.body.data).not.to.exist
      done()
      return
    return

  describe "GET /:id", ->
    result = undefined
    url = "http://google.com"
    beforeEach (done) ->
      request(app).post("/").send(url: url).end (error, res) ->
        result = res.body.data.id
        done()
        return
      return

    it "redirects to URL when id is found", (done) ->
      redirects = []
      request(app).get("/" + result).redirects(1).on("redirect", (res) ->
        redirects.push res.headers.location
        return
      ).end (res) ->
        expect(res).to.exist
        expect(redirects[0]).to.equal url
        done()
        return
      return

    it "responds with 404 when is not found", (done) ->
      redirects = []
      request(app).get("/abc").expect 404, done
      return
    return
  return
