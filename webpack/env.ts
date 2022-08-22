import path from 'path';

const IS_DEV = process.env.NODE_ENV !== 'production';
const SRC_DIR = path.resolve(__dirname, '../src');
const DIST_DIR = path.resolve(__dirname, '../dist');
const PUBLIC_DIR = path.resolve(__dirname, '../public');

export { IS_DEV, SRC_DIR, DIST_DIR, PUBLIC_DIR };
