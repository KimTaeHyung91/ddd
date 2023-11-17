import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  host: 'localhost', // process.env.DB_HOST
  port: 15432, // process.env.DB_PORT
  user: 'postgres', // process.env.DB_USER
  password: '1234', // process.env.DB_PASSWORD
  database: 'order', // process.env.DB_DATABASE,
  schema: 'public', // process.env.DB_SCHEMA
}));
