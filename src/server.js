import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';
import { getEnvVar } from './utils/getEvnVar.js';
import articlesRoutes from './routers/articlesRoutes.js';
import authRoutes from './routers/authRoutes.js';
import usersRoutes from './routers/usersRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export function setupServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cookieParser());

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello, friends!',
    });
  });

  app.use('/auth', authRoutes);
  app.use('/users', usersRoutes);
  app.use('/articles', articlesRoutes);

  app.use(errorHandler);
  app.use(notFoundHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
