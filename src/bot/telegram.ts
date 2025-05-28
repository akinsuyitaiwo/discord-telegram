import { Telegraf } from 'telegraf';
import { generateCode, linkCodes } from './utils';

export const initTelegramBot = (token: string) => {
  const bot = new Telegraf(token);

  bot.start((ctx) => {
    ctx.reply('👋 Use /link to connect your Telegram to Discord.');
  });

  bot.command('link', (ctx) => {
    const username = ctx.from?.username ?? `ID:${ctx.from?.id}`;
    const id = ctx.from?.id;

    if (!id) return ctx.reply("❌ Couldn't get your Telegram ID.");

    const code = generateCode();
    linkCodes.set(code, { telegramId: id, telegramUsername: username });

    ctx.reply(`🔗 Send this code to the Discord bot: \`${code}\``);
  });

  bot.launch();
  console.log('🚀 Telegram bot started');
};
