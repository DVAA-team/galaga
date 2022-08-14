// import path from 'path';
// import { packageDirectorySync } from 'pkg-dir';
import mergeOptions from 'merge-options';
import { config as defaultConfig } from '@/configs/defaults';
import { config as environmentConfig } from '@/configs/development';

// const CONFIG_DIR =
//   process.env.CFG_DIR ||
//   path.join(packageDirectorySync() || '', 'src', 'configs');
const ENV = process.env.CONFIG_ENV || process.env.NODE_ENV;

// let defaultConfig;
// try {
//   defaultConfig = require(path.join(CONFIG_DIR, 'defaults'));
// } catch (err) {
//   const e = err as Record<string, unknown>;
//   if (e.code !== 'MODULE_NOT_FOUND') {
//     throw err;
//   }
//   // eslint-disable-next-line
//   console.warn('[cfg] Warning: could not load default config', err);
// }

// let environmentConfig;
// try {
//   if (ENV) {
//     environmentConfig = require(path.join(CONFIG_DIR, ENV));
//   }
// } catch (err) {
//   const e = err as Record<string, unknown>;
//   if (e.code !== 'MODULE_NOT_FOUND') {
//     throw err;
//   }
//
//   // eslint-disable-next-line
//   console.warn(`[cfg] Warning: could not load ${ENV} config`, err);
// }

export default mergeOptions(
  { environment: ENV },
  defaultConfig,
  environmentConfig
);
