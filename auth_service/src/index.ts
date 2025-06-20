import express from 'express';
import cors from 'cors';
import authRoutes from './routes/router';

const app = express();
app.use(express.json());
app.use(cors({}));

app.use('/api/auth', authRoutes);

export default app;

