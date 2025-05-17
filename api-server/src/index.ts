import app from './app';
import { connectDB } from './config/db';
import { connectNATS } from './config/nats';
import { storeCryptoStats } from './services/stats.service';

const startServer = async () => {
  await connectDB();
  connectNATS(storeCryptoStats);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
