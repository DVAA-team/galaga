const testRegex = /\.svg$/;

export default {
  client: {
    test: testRegex,
    use: [
      {
        loader: 'svg-sprite-loader',
        options: {
          extract: true,
          publicPath: '/static/',
        },
      },
    ],
  },
  server: {
    test: testRegex,
    loader: 'null-loader',
  },
};
