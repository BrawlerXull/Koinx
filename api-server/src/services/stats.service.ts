import CryptoStats from '../models/CryptoStats';
import { fetchCoinStats } from './coinGecko.service';

export const storeCryptoStats = async (coin: string) => {
  const { price, marketCap, change24h } = await fetchCoinStats(coin);
  const stat = new CryptoStats({ coin, price, marketCap, change24h });
  await stat.save();
};

export const getLatestStats = async (coin: string) => {
  return await CryptoStats.findOne({ coin }).sort({ timestamp: -1 });
};

export const getPriceDeviation = async (coin: string) => {
  const stats = await CryptoStats.find({ coin }).sort({ timestamp: -1 }).limit(100);
  const prices = stats.map((s) => s.price);
  const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
  const variance = prices.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / prices.length;
  return Math.sqrt(variance);
};
