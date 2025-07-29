import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';
import { getEnvVar } from './utils/getEvnVar.js';
import articlesRoutes from './routers/articlesRoutes.js';
import authRoutes from './routers/authRoutes.js';
import usersRoutes from './routers/usersRoutes.js';

import { swaggerDocs } from './middlewares/swaggerDocs.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { UPLOAD_DIR } from './constants/index.js';
import { isDevEnv } from './utils/isDevEnv.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export function setupServer() {
  const allowedOrigins = [
    'https://project-harmoniq-front-end.vercel.app',
    'http://localhost:5173',
  ];

  const app = express();
  app.use(express.json());

  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
    }),
  );

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

  app.use('/api-docs', swaggerDocs());

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.use('/uploads', express.static(UPLOAD_DIR));
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    if (isDevEnv()) {
      console.log('⚙️ Запущено в режимі розробки');
    } else {
      console.log('🔐 Продакшн режим');
    }
  });
}
