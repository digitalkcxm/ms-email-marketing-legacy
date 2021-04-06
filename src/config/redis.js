const redis = require("ioredis")

class Redis {
  static newConnection() {
    return new redis({
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST,
      maxRetriesPerRequest: 10
    })
  }
}

module.exports = Redis
