import express from 'express';
import {config} from '../../shared/config';
import amqp from 'amqplib/callback_api';



const app = express();
app.use(express.json());

let channel: amqp.Channel;

export const connectToRabbitMQ = async () => {
  try {
    const conn = await amqp.connect(config.rabbitMQ.url);
    channel = await conn.createChannel();
    await channel.assertQueue(config.rabbitMQ.exchange, 'direct', {
      dureble: true,
    })

    console.log('Connected to RabbitMQ');
    return channel;

  } catch (err) {
    console.error('Error connecting to RabbitMQ:', err);
    throw err;
  }
}

export const getChannel = () => {
  if (!channel) {
    throw new Error('RabbitMQ channel is not initialized');
  }

  return channel;
}

export default app;