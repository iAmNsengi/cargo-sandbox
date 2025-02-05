import { createClient } from "redis";

// const redisClient = new (
//   process.env.REDIS_URL || {
//     host: process.env.REDIS_HOST || "localhost",
//     port: process.env.REDIS_PORT || 6379,
//     retryStrategy: (times) => {
//       // Retry connection every 5 seconds
//       return Math.min(times * 500, 2000);
//     },
//   }
// );

// redisClient.on("error", (err) => {
//   console.error("Redis Client Error:", err);
// });

// redisClient.on("connect", () => {
//   console.log("Successfully connected to Redis");
// });

// export default redisClient;

// Create Redis client with connection options
const redis = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

// Connect to Redis
redis.connect().catch(console.error);

// Handle Redis connection events
redis.on("connect", () => console.log("Redis connected"));
redis.on("error", (err) => console.log("Redis Client Error", err));

export default redis;
