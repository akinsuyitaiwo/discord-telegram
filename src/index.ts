import { config } from 'dotenv';
config();

import mongoose from 'mongoose';
import { initTelegramBot } from './bot/telegram';
import { initDiscordBot } from './bot/discord';
import { initServer } from './server';

const start = async () => {
  const { TELEGRAM_TOKEN, DISCORD_TOKEN, MONGO_URI, PORT = 3000 } = process.env;

  if (!TELEGRAM_TOKEN || !DISCORD_TOKEN || !MONGO_URI) {
    throw new Error('Missing environment variables');
  }

  await mongoose.connect(MONGO_URI);
  console.log('🟢 Connected to MongoDB');

  initTelegramBot(TELEGRAM_TOKEN);
  initDiscordBot(DISCORD_TOKEN);

  const app = initServer();
  app.listen(PORT, () => console.log(`🌍 Server running on http://localhost:${PORT}`));
};

start().catch(console.error);
