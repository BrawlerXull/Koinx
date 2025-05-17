import axios from 'axios';
import { SUPPORTED_COINS } from '../constants/coins';

const VALID_COINS = new Set(SUPPORTED_COINS);

export const fetchCoinStats = async (coin: string) => {
  if (!VALID_COINS.has(coin)) {
    throw new Error(`Invalid coin: ${coin}`);
  }

  try {
    const { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: coin,
        vs_currencies: 'usd',
        include_market_cap: true,
        include_24hr_change: true,
      },
    });

    const info = data[coin];

    if (!info) {
      throw new Error(`No data returned from CoinGecko for coin: ${coin}`);
    }

    return {
      price: info.usd,
      marketCap: info.usd_market_cap,
      change24h: info.usd_24h_change,
    };
  } catch (error: any) {
    console.error(`Error fetching stats for ${coin}:`, error.message);
    throw error;
  }
};
