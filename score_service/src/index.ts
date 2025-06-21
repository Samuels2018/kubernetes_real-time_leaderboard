import express from 'express';
import cors from 'cors';
import {config} from '../../shared/config';
import amqp from 'amqplib';



const app = express();
app.use(cors({}));
app.use(express.json());

let channel: amqp.Channel;

export const connectToRabbitMQ = async () => {
  try {
    const conn = await amqp.connect(config.rabbitMQ.url);
    channel = await conn.createChannel();
    await channel.assertExchange(config.rabbitMQ.exchange, 'direct', {
      durable: true,
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