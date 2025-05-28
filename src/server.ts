import express, { Request, Response } from 'express';

export const initServer = () => {
  const app = express();

  // Fix: define request and response types explicitly
  app.get('/', (req: Request, res: Response) => {
    res.send('Bot is running');
  });

  return app;
};
