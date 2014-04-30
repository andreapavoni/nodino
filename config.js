'use strict';

const config = {
  port: process.env.PORT || 4000,
  secret: process.env.SECRET || 'secret',
  redis: {
    host: process.env.REDIS_HOST || null,
    port: process.env.REDIS_PORT || null
  }
};

module.exports = config;
