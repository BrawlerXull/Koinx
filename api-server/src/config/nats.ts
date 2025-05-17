import { connect, NatsConnection, StringCodec } from 'nats';
import { storeCryptoStats } from '../services/stats.service';
import { SUPPORTED_COINS } from '../constants/coins';

let nc: NatsConnection;

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
        for (const coin of SUPPORTED_COINS) {
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
