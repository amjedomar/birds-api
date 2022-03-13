import dotenv from 'dotenv';
import { createConnection } from 'typeorm';

dotenv.config();

(async () => {
  console.log('Connecting to the database...');
  await createConnection();
  require('./app');
})();
