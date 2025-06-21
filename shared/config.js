"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    port: parseInt(process.env.PORT || '3000', 10),
    env: process.env.NODE_ENV || 'development',
    rabbitMQ: {
        url: process.env.RABBITMQ_URL || 'amqp://localhost',
        exchange: process.env.RABBITMQ_EXCHANGE || 'leaderboard_exchange',
        scoreQueue: process.env.RABBITMQ_SCORE_QUEUE || 'score_queue',
        leaderboardQueue: process.env.RABBITMQ_LEADERBOARD_QUEUE || 'leaderboard_queue',
    },
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        leaderboardKey: {
            global: 'leaderboard:global',
            daily: 'leaderboard:daily',
            weekly: 'leaderboard:weekly',
        }
    },
    mongoDB: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017',
        dbName: process.env.MONGODB_DBNAME || 'leaderboard',
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'your-secret-key',
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    },
};
