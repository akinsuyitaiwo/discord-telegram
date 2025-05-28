"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDiscordBot = void 0;
const discord_js_1 = require("discord.js");
const utils_1 = require("./utils");
const userlink_1 = __importDefault(require("../model/userlink"));
const initDiscordBot = (token) => {
    const client = new discord_js_1.Client({
        intents: [
            discord_js_1.GatewayIntentBits.Guilds,
            discord_js_1.GatewayIntentBits.GuildMessages,
            discord_js_1.GatewayIntentBits.MessageContent,
        ],
    });
    client.on('ready', () => {
        console.log(`✅ Discord bot ready as ${client.user?.tag}`);
    });
    client.on('messageCreate', async (message) => {
        if (message.author.bot)
            return;
        const input = message.content.trim().toUpperCase();
        if (utils_1.linkCodes.has(input)) {
            const { telegramUsername, telegramId } = utils_1.linkCodes.get(input);
            const discordUsername = message.author.username;
            const discordId = message.author.id;
            await userlink_1.default.create({
                telegramId,
                telegramUsername,
                discordUsername,
                discordId,
            });
            await message.reply(`✅ Linked to Telegram @${telegramUsername}!`);
            utils_1.linkCodes.delete(input);
            console.log(`Linked ${telegramUsername} <-> ${discordUsername}`);
        }
    });
    client.login(token);
};
exports.initDiscordBot = initDiscordBot;
