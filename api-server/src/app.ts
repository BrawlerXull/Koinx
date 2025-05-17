import express from 'express';
import dotenv from 'dotenv';
import statsRoutes from './routes/stats.routes';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/', statsRoutes);

export default app;
