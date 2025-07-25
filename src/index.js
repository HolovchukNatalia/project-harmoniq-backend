import { initMongoDB } from './db/initMongoDB.js';
import { setupServer } from './server.js';

const bootstrap = async () => {
  try {
    await initMongoDB();
    setupServer();
  } catch (err) {
    console.error('❌ Error during app initialization:', err);
    process.exit(1);
  }
};

bootstrap();
