const { ModulesOption } = require('@babel/preset-env/lib/options');
const path = require('path');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: './src/server.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.cjs',
  },
};