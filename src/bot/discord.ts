import { Client, GatewayIntentBits, Message } from 'discord.js';
import { linkCodes } from './utils';
import UserLink from '../model/userlink';

export const initDiscordBot = (token: string) => {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  client.on('ready', () => {
    console.log(`✅ Discord bot ready as ${client.user?.tag}`);
  });

  client.on('messageCreate', async (message: Message) => {
    if (message.author.bot) return;

    const input = message.content.trim().toUpperCase();

    if (linkCodes.has(input)) {
      const { telegramUsername, telegramId } = linkCodes.get(input)!;
      const discordUsername = message.author.username;
      const discordId = message.author.id;

      await UserLink.create({
        telegramId,
        telegramUsername,
        discordUsername,
        discordId,
      });

      await message.reply(`✅ Linked to Telegram @${telegramUsername}!`);
      linkCodes.delete(input);
      console.log(`Linked ${telegramUsername} <-> ${discordUsername}`);
    }
  });

  client.login(token);
};
