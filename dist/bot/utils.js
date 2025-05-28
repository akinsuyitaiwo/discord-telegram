"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCode = exports.linkCodes = void 0;
exports.linkCodes = new Map();
const generateCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
};
exports.generateCode = generateCode;
