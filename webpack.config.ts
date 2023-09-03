import { join } from 'path';
import { Configuration } from 'webpack';
import nodeExternals from 'webpack-node-externals';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';

const config: Configuration = {
  entry: './src/index.ts',
  target: 'node',
  mode: 'development',
  externals: [nodeExternals()],
  output: {
    path: join(__dirname, 'dist'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        type: 'javascript/auto', // Webpack 5
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
  },
};

export default config;
