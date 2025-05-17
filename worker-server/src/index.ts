import dotenv from 'dotenv';
import { connectNATS } from './config/nats';
import { startCronJob } from './services/cronService';

dotenv.config();

async function start(): Promise<void> {
  await connectNATS();
  startCronJob();
}

start().catch(err => {
  console.error('Failed to start worker-server:', err);
  process.exit(1);
});
