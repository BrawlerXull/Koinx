import { Request, Response } from 'express';
import { SUPPORTED_COINS } from '../constants/coins';
import { getLatestStats, getPriceDeviation } from '../services/stats.service';

export const getStats = async (req: Request, res: Response): Promise<any> => {
  const coin = req.query.coin as string;

  if (!SUPPORTED_COINS.includes(coin)) {
    return res.status(400).json({ error: 'Invalid coin' });
  }

  const data = await getLatestStats(coin);
  if (!data) {
    return res.status(404).json({ error: 'No data found' });
  }

  return res.json({
    price: data.price,
    marketCap: data.marketCap,
    '24hChange': data.change24h,
  });
};

export const getDeviation = async (req: Request, res: Response): Promise<any> => {
  const coin = req.query.coin as string;

  if (!SUPPORTED_COINS.includes(coin)) {
    return res.status(400).json({ error: 'Invalid coin' });
  }

  const deviation = await getPriceDeviation(coin);
  return res.json({ deviation: Number(deviation.toFixed(2)) });
};
