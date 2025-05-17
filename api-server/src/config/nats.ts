import { connect, StringCodec } from 'nats';

export const connectNATS = async (onMessage: (coin: string) => void) => {
  const nc = await connect({ servers: process.env.NATS_URL! });
  console.log('Connected to NATS');

  const sc = StringCodec();
  const sub = nc.subscribe('update-coin');
  for await (const m of sub) {
    const coin = sc.decode(m.data);
    onMessage(coin);
  }
};
