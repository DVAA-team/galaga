import http from 'node:http';

export default function httpServerErrorHandler(port: number) {
  return function errorHandler(
    this: http.Server,
    error: NodeJS.ErrnoException
  ) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        return process.exit(1);
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        return process.exit(1);
      default:
        throw error;
    }
  };
}
