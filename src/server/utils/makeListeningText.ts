import { networkInterfaces } from 'node:os';

function findIP(): string[] {
  const nets = networkInterfaces();
  const result: string[] = [];

  for (const name of Object.keys(nets)) {
    for (const net of nets[name] ?? []) {
      if ('IPv4'.includes(net.family) && !net.internal) {
        result.push(net.address);
        break;
      }
    }
  }

  return result;
}

export default function makeListeningText(
  hosts: string[],
  port: number | string | undefined,
  protocol = 'http'
) {
  return `running on:
${hosts
  .concat(findIP())
  .map((host) => `   * ${protocol}://${host}:${port}`)
  .join('\n')}
`;
}
