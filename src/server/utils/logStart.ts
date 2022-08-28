import http from 'node:http';
import makeListeningText from './makeListeningText';

export default function logStart(this: http.Server) {
  const addr = this.address();
  if (!addr) {
    console.error('\nServer not listening...');
    process.exit(2);
  }
  const bind =
    typeof addr === 'string'
      ? `\nRunning on:\n   * pipe ${addr}`
      : `\nServer ${makeListeningText(['localhost'], addr.port)}`;
  // eslint-disable-next-line no-console
  console.log(bind);
}
