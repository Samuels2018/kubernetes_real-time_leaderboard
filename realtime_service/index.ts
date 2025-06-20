import {config } from '../shared/config';
import {setupSocket} from './src/socket';
import {connectRabbitMQ} from './src/rabbitmq';

const server = setupSocket();
server.listen(config.port, () => {
  console.log(`Real-time service running on port ${config.port}`);
  connectRabbitMQ();
})