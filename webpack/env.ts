import path from 'path';

const IS_DEV = process.env.NODE_ENV !== 'production';
const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const MIGRATION_DIR = path.join(SRC_DIR, 'database/migrations');

export { IS_DEV, ROOT_DIR, SRC_DIR, DIST_DIR, PUBLIC_DIR, MIGRATION_DIR };
