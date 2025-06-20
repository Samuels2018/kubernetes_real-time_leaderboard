import app from './src';
import mongoose from 'mongoose';
import { config } from '../shared/config';
import { connectToRabbitMQ } from './src/index';
import { startConsumer } from './src/consumer/index';
import { start } from 'repl';
import { Score, IScore } from './src/models';

mongoose.connect(config.mongoDB.uri, {
  dbName: config.mongoDB.dbName,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const ScoreModel = mongoose.model<IScore>('Score', Score);


connectToRabbitMQ()
  .then(() => startConsumer())
  .catch(err => console.error('Error starting RabbitMQ consumer:', err));

app.listen(config.port, () => {
  console.log(`Auth service running on port ${config.port}`);
});