'use strict';

var config = {
  development: {
    port: process.env.PORT || 4000,
    secret: process.env.SECRET || 'secret',
    redis: process.env.REDIS_URL || 'redis://1@localhost:6379'
  },

  test: {
    port: process.env.PORT || 4000,
    secret: process.env.SECRET || 'secret',
    redis: process.env.REDIS_URL || 'redis://2@localhost:6379'
  },

  production: {
    port: process.env.PORT || 4000,
    secret: process.env.SECRET || 'secret',
    redis: process.env.REDIS_URL || 'redis://3@localhost:6379'
  }
}

module.exports = function(env) {
  env = env || 'development';
  return config[env];
};

