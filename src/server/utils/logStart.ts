import makeListeningText from '@/server/utils/makeListeningText';
import http from 'node:http';

export default function logStart(this: http.Server) {
  const addr = this.address();
  if (!addr) {
    console.error('Server not listening...');
    process.exit(2);
  }
  const bind =
    typeof addr === 'string'
      ? `Running on:\n   * pipe ${addr}`
      : `Server ${makeListeningText(['localhost'], addr.port)}`;
  // eslint-disable-next-line no-console
  console.log(bind);
}
