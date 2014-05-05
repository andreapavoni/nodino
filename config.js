'use strict';

module.exports = {
  port: process.env.PORT || 4000,
  secret: process.env.SECRET || 'secret',
  redis: process.env.REDIS_URL || null
};
