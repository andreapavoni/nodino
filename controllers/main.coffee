module.exports = (config) ->
  shortener = require(__dirname + "/../models/shortener")(config)

  index: (req, res) ->
    res.render "index"
    return

  create: (req, res) ->
    shortener.create req.body.url, ((data) ->
      payload =
        url: data.url
        id: data.id
        host: req.protocol + "://" + req.hostname

      res.json
        error: null
        data: payload

      return
    ), (err) ->
      res.json
        error: err.message
        data: null
      return
    return

  show: (req, res) ->
    shortener.findById req.params.id, ((data) ->
      res.redirect data.url
      return
    ), (err) ->
      res.status 404
      res.render "error",
        message: "404: Not found."
        error: err
      return
    return
