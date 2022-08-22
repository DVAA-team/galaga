import httpServerErrorHandler from '@/server/utils/httpServerErrorHandler';
import logStart from '@/server/utils/logStart';
import { Express } from 'express';
import http from 'node:http';

export function startServer(app: Express, port: number) {
  app.set('port', port);
  const httpServer = http.createServer(app);
  httpServer.on('error', httpServerErrorHandler(port));
  httpServer.on('listening', logStart);
  return httpServer.listen(port, '0.0.0.0');
}
