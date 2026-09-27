import path from 'node:path';
import { rspack } from '@rspack/core';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

// Plain .mjs for the same reason as the shell's config — see that file's comment.
const isProd = process.env.NODE_ENV === 'production';

export default {
  entry: { main: './src/index.ts' },
  target: 'web',
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? false : 'cheap-module-source-map',
  output: {
    uniqueName: 'templates',
    publicPath: 'auto',
    path: path.resolve(process.cwd(), 'dist'),
  },
  resolve: { extensions: ['.ts', '.tsx', '.js', '.jsx'] },
  experiments: { css: true },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'builtin:swc-loader',
        options: {
          jsc: {
            parser: { syntax: 'typescript', tsx: true },
            transform: { react: { runtime: 'automatic' } },
          },
        },
        type: 'javascript/auto',
      },
      // postcss-loader runs Tailwind before Rspack's native CSS handling picks it up.
      { test: /\.css$/, type: 'css', use: ['postcss-loader'] },
    ],
  },
  devServer: {
    port: 3002,
    // Required so the shell (port 3000) can fetch remoteEntry.js cross-origin in dev.
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  plugins: [
    new rspack.HtmlRspackPlugin({ template: './public/index.html' }),
    new ModuleFederationPlugin({
      name: 'templates',
      filename: 'remoteEntry.js',
      exposes: { './TemplatesApp': './src/TemplatesApp.tsx' },
      shared: {
        react: { singleton: true, requiredVersion: false },
        'react-dom': { singleton: true, requiredVersion: false },
        zustand: { singleton: true, requiredVersion: false },
      },
    }),
  ],
};
