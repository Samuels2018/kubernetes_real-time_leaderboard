import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { config } from '../../shared/config';
import authRoutes from './routes/router';
import e from 'express';

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);

export default app;

