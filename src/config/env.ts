const contextName = process.env.NODE_ENV ?? 'development';
const isProd = () => contextName === 'production';
const isDev = () => !isProd();

export default {
  isProd,
  isDev,
  contextName,
};
