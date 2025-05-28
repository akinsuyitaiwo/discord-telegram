"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTelegramBot = void 0;
const telegraf_1 = require("telegraf");
const utils_1 = require("./utils");
const initTelegramBot = (token) => {
    const bot = new telegraf_1.Telegraf(token);
    bot.start((ctx) => {
        ctx.reply('👋 Use /link to connect your Telegram to Discord.');
    });
    bot.command('link', (ctx) => {
        const username = ctx.from?.username ?? `ID:${ctx.from?.id}`;
        const id = ctx.from?.id;
        if (!id)
            return ctx.reply("❌ Couldn't get your Telegram ID.");
        const code = (0, utils_1.generateCode)();
        utils_1.linkCodes.set(code, { telegramId: id, telegramUsername: username });
        ctx.reply(`🔗 Send this code to the Discord bot: \`${code}\``);
    });
    bot.launch();
    console.log('🚀 Telegram bot started');
};
exports.initTelegramBot = initTelegramBot;
