import { env } from "process";
import { Types } from 'mongoose';

export type UserId = Types.ObjectId | string;

export interface LeaderboardEntry {
  userId: UserId;
  username?: string; // Puede ser poblado en consultas
  score: number;
  rank: number;
}

export interface LeaderboardPeriod {
  start: Date;
  end: Date;
}

export interface GameScore {
  gameId: string;
  score: number;
  timestamp: Date;
}

export interface UserProfile {
  userId: UserId;
  username: string;
  email: string;
  overallRank: number;
  overallScore: number;
  topScores: GameScore[];
}


interface RabbitMQConfig {
  url: string;
  exchange: string;
  scoreQueue: string;
  leaderboardQueue: string;
}

interface RedisConfig {
  host: string;
  port: number;
  leaderboardKey: {
    global: string;
    daily: string;
    weekly: string;
  }
}

interface MongoDBConfig {
  uri: string;
  dbName: string;
}

interface JWTConfig {
  secret: string;
  expiresIn: number | string;
}

export interface Config {
  port: number;
  rabbitMQ: RabbitMQConfig;
  redis: RedisConfig;
  mongoDB: MongoDBConfig;
  jwt: JWTConfig;
  env: 'development' | 'production' | 'test';
}

export const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  env: process.env.NODE_ENV as any || 'development',
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
}
