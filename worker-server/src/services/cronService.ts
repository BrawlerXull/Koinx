import cron from 'node-cron';
import { getNATS } from '../config/nats';

export function startCronJob(): void {
  cron.schedule('*/15 * * * *', () => {
    const nc = getNATS();
    nc.publish('crypto.update', Buffer.from(JSON.stringify({ trigger: 'update' })));
    console.log(`[${new Date().toISOString()}] Published update event to NATS`);
  });
  console.log('Worker cron job scheduled every 15 minutes');
}
