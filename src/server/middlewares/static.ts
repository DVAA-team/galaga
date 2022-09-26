import path from 'node:path';
import express, { RequestHandler } from 'express';
import { projectPaths } from '@/server/config';

const staticMiddleware: RequestHandler[] = [
  express.static(path.join(projectPaths.dist, 'public')),
  express.static(path.join(projectPaths.dist, 'files')),
];

export default staticMiddleware;
