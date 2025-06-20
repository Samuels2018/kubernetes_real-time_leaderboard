import {getChannel} from '../index';
import {config} from '../../../shared/config';
import {ScoreModel} from './models/score';

export const startConsumer = async () => {
  try {
    const channel = getChannel();
    await channel.assertQueue(config.rabbitMQ.scoreQueue, { durable: true });
    channel.bindQueue(config.rabbitMQ.scoreQueue, config.rabbitMQ.exchange, 'score');

    console.log('Consumer is ready to receive messages from RabbitMQ');

    channel.consume(config.rabbitMQ.scoreQueue, async (msg: any) => {
      console.log('Recieved message from RabbitMQ');
      if (msg) {
        const {userId, gameId, score} = JSON.parse(msg.content.toString());
        const scoreData = new ScoreModel({
          userId,
          gameId,
          score,
          date: new Date(),
        })

        await scoreData.save()

        channel.publish(
          config.rabbitMQ.exchange,
          'leaderboard',
          Buffer.from(JSON.stringify({ userId, gameId, score })),
        )

        channel.ack(msg);
      }
    })

  } catch (err) {
    console.error('Error starting consumer:', err);
  }
}