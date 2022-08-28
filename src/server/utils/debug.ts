import debug from 'debug';

debug.enable(process.env.DEBUG ?? '');

export default (namespace: string) => debug('galaga:server').extend(namespace);
