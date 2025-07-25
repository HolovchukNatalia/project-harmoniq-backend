import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEvnVar.js';
import authRoutes from './routers/authRoutes.js';
import { AppError } from './utils/errorUtils.js';
import { errorHandler } from './middlewares/errorHandler.js';

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

  app.use('/auth', authRoutes);

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello, friends!',
    });
  });

  app.all('*', (req, res, next) => {
    next(new AppError(`Route ${req.originalUrl} not found`, 404));
  });

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
