import axios from 'axios';

export const fetchCoinStats = async (coin: string) => {
  const url = `https://api.coingecko.com/api/v3/simple/price`;
  const { data } = await axios.get(url, {
    params: {
      ids: coin,
      vs_currencies: 'usd',
      include_market_cap: 'true',
      include_24hr_change: 'true',
    },
  });

  const info = data[coin];
  return {
    price: info.usd,
    marketCap: info.usd_market_cap,
    change24h: info.usd_24h_change,
  };
};
