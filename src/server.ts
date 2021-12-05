import 'reflect-metadata';
import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';

import { router } from './routes';
import './database';

const app = express();
app.use(express.json());

app.use(router);
app.use(
  (error: Error, request: Request, response: Response, _next: NextFunction) => {
    if (error instanceof Error) {
      return response.status(400).json({ error: error.message });
    }
    return response.status(500).json({
      status: 'Error',
      message: 'Internal Server Error',
    });
  }
);

app.listen(3000, () => {
  console.log('Server is running!');
});
