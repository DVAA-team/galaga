export default function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    throw new Error('Port must be number');
  }

  if (port < 0) {
    throw new Error('Port must be positive');
  }

  return port;
}
