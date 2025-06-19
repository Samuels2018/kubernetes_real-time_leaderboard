import app from './src';
import mongoose from 'mongoose';
import { config } from '../shared/config';

mongoose.connect(config.mongoDB.uri, {
  dbName: config.mongoDB.dbName,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));


app.listen(config.port, () => {
  console.log(`Auth service running on port ${config.port}`);
});
