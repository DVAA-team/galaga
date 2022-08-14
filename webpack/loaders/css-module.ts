const testRegex = /\.module\.css$/;

export default {
  client: {
    test: testRegex,
    exclude: /node_modules/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: {
            localIdentName: '[local]--[hash:base64:5]',
            hashStrategy: 'minimal-subset',
          },
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
