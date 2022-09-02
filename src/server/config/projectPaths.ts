import path from 'path';

const root = path.resolve(__dirname, '../..');
const src = path.join(root, 'src');
const dist = path.join(root, 'dist');

export default {
  root,
  src,
  dist,
};
