import {createClient, RedisClientType} from 'redis';
import {promisify} from 'util';
import { config } from '../../../shared/config';


const redisClient: RedisClientType = createClient({
  url: `${config.redis.host}:${config.redis.port}`,
})


export const zaddAsync = promisify(redisClient.zAdd).bind(redisClient);
export const zrevrangeAsync = promisify(redisClient.zRevRank).bind(redisClient);
export const zrankAsync = promisify(redisClient.zRank).bind(redisClient);
export const zincrbyAsync = promisify(redisClient.zIncrBy).bind(redisClient);

export async function getTopPlayers (limit: number = 10) {
  return await redisClient.zRevRank(config.redis.leaderboardKey.global, (limit - 1).toString());
}

export async function getUserRank (userId: string) {
  return await redisClient.zRank(config.redis.leaderboardKey.global, userId);
}
