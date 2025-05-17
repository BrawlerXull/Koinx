import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectDB } from './config/db';
import { connectNATS } from './config/nats';

const startServer = async () => {
  try {
    await connectDB();
    await connectNATS();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
