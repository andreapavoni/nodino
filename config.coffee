# this config activates SAFE MODE. Actually this means that records are expired
# after a given timeout
safeMode = process.env.SAFE_MODE or false
safeModeExpire = 1800 # 30 minutes
config =
  development:
    safeMode: safeMode
    safeModeExpire: safeModeExpire
    port: process.env.PORT or 4000
    secret: process.env.SECRET or "secret"
    redis: process.env.REDIS_URL or "redis://1@localhost:6379"

  test:
    safeMode: safeMode
    safeModeExpire: safeModeExpire
    port: process.env.PORT or 4000
    secret: process.env.SECRET or "secret"
    redis: process.env.REDIS_URL or "redis://2@localhost:6379"

  production:
    safeMode: safeMode
    safeModeExpire: safeModeExpire
    port: process.env.PORT or 4000
    secret: process.env.SECRET or "secret"
    redis: process.env.REDIS_URL or process.env.REDISTOGO_URL or "redis://3@localhost:6379"

module.exports = (env) ->
  env = env or "development"
  config[env]
