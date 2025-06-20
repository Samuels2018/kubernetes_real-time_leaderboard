import routes from './routes';
import express from 'express';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', routes);

export default app;