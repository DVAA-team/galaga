const testRegex = /\.css$/;

export default {
  client: {
    test: testRegex,
    exclude: /\.module\.css$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
        },
      },
      {
        loader: 'postcss-loader',
      },
    ],
  },
  server: {
    test: testRegex,
    loader: 'null-loader',
  },
};
