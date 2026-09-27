import path from 'node:path';
import { rspack } from '@rspack/core';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

// Plain .mjs (not .ts): with "type": "module" in package.json, Node's own ESM
// loader tries to import the config file directly and errors on ".ts" before
// Rspack's TS loader ever gets a chance. Plain JS avoids that entirely.
const isProd = process.env.NODE_ENV === 'production';

export default {
  entry: { main: './src/index.ts' },
  target: 'web',
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? false : 'cheap-module-source-map',
  output: {
    uniqueName: 'shell',
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
    port: 3000,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  plugins: [
    new rspack.HtmlRspackPlugin({ template: './public/index.html' }),
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        // Points at the editor remote's dev server; swap for a CDN URL per env in production.
        editor: process.env.EDITOR_REMOTE_URL ?? 'editor@http://localhost:3001/remoteEntry.js',
        // Points at the templates remote's dev server; swap for a CDN URL per env in production.
        templates: process.env.TEMPLATES_REMOTE_URL ?? 'templates@http://localhost:3002/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        'react-dom': { singleton: true, requiredVersion: false },
        'react-router': { singleton: true, requiredVersion: false },
        zustand: { singleton: true, requiredVersion: false },
      },
    }),
  ],
};
