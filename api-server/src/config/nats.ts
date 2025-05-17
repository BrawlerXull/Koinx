import { connect, NatsConnection, StringCodec } from 'nats';
import { storeCryptoStats } from '../services/stats.service';

let nc: NatsConnection;
const VALID_COINS = ['bitcoin', 'ethereum', 'matic-network'];

export const connectNATS = async () => {
  nc = await connect({ servers: process.env.NATS_URL! });
  console.log('✅ Connected to NATS');

  const sc = StringCodec();
  const sub = nc.subscribe('crypto.update');

  (async () => {
    for await (const msg of sub) {
      try {
        const data = JSON.parse(sc.decode(msg.data));
        if (data.trigger !== 'update') {
          console.warn('⚠️ Ignoring invalid or unrecognized message:', data);
          continue;
        }

        console.log('🔁 Received update trigger. Updating all valid coins...');
        for (const coin of VALID_COINS) {
          try {
            await storeCryptoStats(coin);
            console.log(`✅ Stored stats for: ${coin}`);
          } catch (err) {
            console.error(`❌ Error storing stats for ${coin}:`, err);
          }
        }
      } catch (err) {
        console.error('❌ Error parsing or handling NATS message:', err);
      }
    }
  })();
};

export const getNATS = () => nc;
