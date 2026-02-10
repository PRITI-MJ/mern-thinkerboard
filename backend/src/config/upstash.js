const {Ratelimit} = require("@upstash/ratelimit");
const {Redis} = require("@upstash/redis");

//load environment variables from .env file like UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN    
const dotenv = require("dotenv");
dotenv.config();

//create a ratelimiter, that allows 10 requests oer 20 seconds
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "20 s")
})

module.exports = ratelimit;