module.exports = (api) => {
  const isNode = true; //
  api.caller((caller) => caller && caller.target === 'node');
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: isNode
            ? { node: 'current' }
            : { browsers: ['>0.25%', 'not ie 11', 'not op_mini all'] },
        },
      ],
      ['@babel/preset-react', { runtime: 'automatic' }],
      '@babel/preset-typescript',
    ],
  };
};
