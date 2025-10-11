import express from 'express';
import type { Express } from 'express';
import mainRouter from './routes/main.js';

const app: Express = express();
const PORT: number = 9000;

app.use('/', mainRouter);

app.listen(PORT, () => {
    console.log(`🏃: Server running on port ${PORT}`);
})