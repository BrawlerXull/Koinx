import { connect, NatsConnection } from 'nats';
import dotenv from 'dotenv';

dotenv.config();

let nc: NatsConnection;

export async function connectNATS(): Promise<NatsConnection> {
  nc = await connect({
    servers: process.env.NATS_URL,
    user: process.env.NATS_USER,
    pass: process.env.NATS_PASSWORD,
  });
  console.log('Connected to NATS server');
  return nc;
}

export function getNATS(): NatsConnection {
  if (!nc) {
    throw new Error('NATS not connected');
  }
  return nc;
}
