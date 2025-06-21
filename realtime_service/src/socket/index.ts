import express from 'express';
import cors from 'cors';
import http from 'http';
import {Server } from 'socket.io';
import { getTopPlayers, getUserRank } from '../redis';

const app = express();
app.use(cors({origin: '*'}));
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  }
});

export function setupSocket () {
  io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('get-leaderboard', async (limit: number, callback) => {
      const leaderboard = await getTopPlayers(limit);
      callback(leaderboard);
    })

    socket.on('get-user-rank', async (userId: string, callback) => {
      const rank = await getUserRank(userId);
      callback(rank);
    })
  })

  return server;
}
