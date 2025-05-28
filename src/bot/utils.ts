export const linkCodes = new Map<string, { telegramId: number; telegramUsername: string }>();

export const generateCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};
