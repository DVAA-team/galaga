const testRegex = /\.(?:ico|gif|png|jpg|jpeg|mp3)$/i;

export default {
  client: {
    test: testRegex,
    type: 'asset/resource',
  },
  server: {
    test: testRegex,
    loader: 'null-loader',
  },
};
