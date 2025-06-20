import amqp from 'amqplib';
import { config } from '../../../shared/config';
import { zincrbyAsync, getTopPlayers } from '../redis';
import {io} from '../socket';

let channel: amqp.Channel;

export async function connectRabbitMQ () {
  try {

    const conn = await amqp.connect(config.rabbitMQ.url);
    channel = await conn.createChannel();

    await channel.assertExchange(config.rabbitMQ.exchange, 'direct', {durable: true});
    await channel.assertQueue(config.rabbitMQ.scoreQueue, {durable: true});
    await channel.bindQueue(config.rabbitMQ.scoreQueue, config.rabbitMQ.exchange, 'leaderboard');

    console.log('Connected to RabbitMQ');

    channel.consume(config.rabbitMQ.leaderboardQueue, async (msg) => {
      if (msg) {
        const {userId, score} = JSON.parse(msg.content.toString());

        // Update Redis sorted set
        await zincrbyAsync(config.redis.leaderboardKey.global, score, userId);
        await zincrbyAsync(config.redis.leaderboardKey.daily, score, userId);
        await zincrbyAsync(config.redis.leaderboardKey.weekly, score, userId);

        // Emit updated leaderboard to all connected clients
        const topPlayers = await getTopPlayers(10);
        io.emit('leaderboard:update', topPlayers);

        channel.ack(msg);
      }
    });

  } catch (err) {
    console.error('Error connecting to RabbitMQ:', err);
    throw err;
  }
}