module.exports = (config) ->
  validUrl = require("valid-url")
  redis = require("redis-url").connect(config.redis)
  redisKey = "nodino"
  keyId = (id) ->
    redisKey + ".id|" + id

  base62 = (number) ->
    chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("")
    encoded = ""
    return "0"  if typeof (number) isnt "number" or number is 0

    while number > 0
      encoded += chars[number % 62]
      number = Math.floor(number / 62)
    encoded

  generateId = (callback) ->
    # I needed a magic number to start the counter and get a nice-looking id.
    seed = 20130715
    counter_key = redisKey + ".counter"
    redis.get counter_key, (err, counter) ->
      if counter
        redis.incr counter_key, (err, newCounter) ->
          callback err, base62(newCounter)
          return
      else
        redis.set counter_key, seed, (err, data) ->
          callback err, base62(seed)
          return

      return

    return

  findById: (id, cbOk, cbErr) ->
    redis.get keyId(id), (err, url) ->
      if url
        cbOk
          url: url
          id: id
      else
        cbErr (new Error("Id not found."))
      return

    return

  create: (url, cbOk, cbErr) ->
    return cbErr((new Error("Url not valid.")))  unless validUrl.isWebUri(url)
    generateId (err, id) ->
      mainCallback = (err, data) ->
        unless err
          cbOk
            url: url
            id: id
        else
          cbErr err

      # prevent spammers and such by erasing records after config.safeModeExpire
      if config.safeMode
        redis.multi().set(keyId(id), url, mainCallback).expire([
          keyId(id)
          config.safeModeExpire
        ]).exec()
      else
        redis.set keyId(id), url, mainCallback
      return

    return
