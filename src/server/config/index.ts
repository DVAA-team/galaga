import { normalizePort } from '@/server/utils';

export const port = normalizePort(process.env.PORT || '3000');

export { env } from '@/config';
export { default as projectPaths } from './projectPaths';
export * as oauth2 from './oauth2';
