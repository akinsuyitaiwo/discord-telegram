"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const mongoose_1 = __importDefault(require("mongoose"));
const telegram_1 = require("./bot/telegram");
const discord_1 = require("./bot/discord");
const server_1 = require("./server");
const start = async () => {
    const { TELEGRAM_TOKEN, DISCORD_TOKEN, MONGO_URI, PORT = 3000 } = process.env;
    if (!TELEGRAM_TOKEN || !DISCORD_TOKEN || !MONGO_URI) {
        throw new Error('Missing environment variables');
    }
    await mongoose_1.default.connect(MONGO_URI);
    console.log('🟢 Connected to MongoDB');
    (0, telegram_1.initTelegramBot)(TELEGRAM_TOKEN);
    (0, discord_1.initDiscordBot)(DISCORD_TOKEN);
    const app = (0, server_1.initServer)();
    app.listen(PORT, () => console.log(`🌍 Server running on http://localhost:${PORT}`));
};
start().catch(console.error);
