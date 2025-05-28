"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initServer = void 0;
const express_1 = __importDefault(require("express"));
const initServer = () => {
    const app = (0, express_1.default)();
    // Fix: define request and response types explicitly
    app.get('/', (req, res) => {
        res.send('Bot is running');
    });
    return app;
};
exports.initServer = initServer;
