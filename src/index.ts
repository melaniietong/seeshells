import express from 'express';
import type { Express } from 'express';
import mainRouter from './routes/main.js';
import cors from 'cors';

const app: Express = express();
const PORT: number = 9000;
const CLIENT_PORT: number = 9001;

app.use(cors({
    origin: `http://localhost:${CLIENT_PORT}`,
    methods: ['POST'],
    allowedHeaders: ['Content-Type']
  }));

app.use('/', mainRouter);

app.listen(PORT, () => {
    console.log(`[🏃] Server running on port ${PORT}`);
})