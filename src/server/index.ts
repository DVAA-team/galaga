import { app } from '@/server/app';
import normalizePort from '@/server/utils/normalizePort';
import { startServer } from '@/server/utils/startApp';
import dotenv from 'dotenv';

dotenv.config();

const PORT = normalizePort(process.env.PORT || '3000');

startServer(app, PORT);
