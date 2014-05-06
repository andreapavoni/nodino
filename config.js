'use strict';

// this config activates SAFE MODE. Actually this means that records are expired
// after a given timeout
var safeMode = process.env.SAFE_MODE || false;
var safeModeExpire = 1800; // 30 minutes

var config = {
  development: {
    safeMode: safeMode,
    safeModeExpire: safeModeExpire,
    port: process.env.PORT || 4000,
    secret: process.env.SECRET || 'secret',
    redis: process.env.REDIS_URL || 'redis://1@localhost:6379'
  },

  test: {
    safeMode: safeMode,
    safeModeExpire: safeModeExpire,
    port: process.env.PORT || 4000,
    secret: process.env.SECRET || 'secret',
    redis: process.env.REDIS_URL || 'redis://2@localhost:6379'
  },

  production: {
    safeMode: safeMode,
    safeModeExpire: safeModeExpire,
    port: process.env.PORT || 4000,
    secret: process.env.SECRET || 'secret',
    redis: process.env.REDIS_URL || process.env.REDISTOGO_URL || 'redis://3@localhost:6379'
  }
}

module.exports = function(env) {
  env = env || 'development';
  return config[env];
};

