import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';
import { getEnvVar } from './utils/getEvnVar.js';
<<<<<<< HEAD
import articlesRoutes from './routers/articles.js';
=======
import authRoutes from './routers/authRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
>>>>>>> 99f8eb9b1d7530e84871be25975907f62f07c6b9

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

<<<<<<< HEAD
=======
  app.use(cookieParser());

  app.use('/auth', authRoutes);

>>>>>>> 99f8eb9b1d7530e84871be25975907f62f07c6b9
  app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
  });
<<<<<<< HEAD
  app.use(articlesRoutes);

  app.use(errorHandler);

  app.use(notFoundHandler);

=======

  app.use(errorHandler);

>>>>>>> 99f8eb9b1d7530e84871be25975907f62f07c6b9
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
