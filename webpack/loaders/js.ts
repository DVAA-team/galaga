const testRegex = /\.tsx?$/;

export default {
  client: {
    test: testRegex,
    exclude: /node_modules/,
    use: { loader: 'babel-loader' },
  },
  server: {
    test: testRegex,
    exclude: /node_modules/,
    use: { loader: 'babel-loader' },
  },
};
