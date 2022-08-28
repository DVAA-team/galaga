import debug from 'debug';

debug.enable(process.env.DEBUG ?? '');

export default (namespace: string) => debug('galaga:client').extend(namespace);
