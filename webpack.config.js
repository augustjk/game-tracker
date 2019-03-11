const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.jsx',
  devServer: {
    contentBase: path.resolve(__dirname, './client'),
    publicPath: '/build/',
    proxy: {
      '/action': 'http://localhost:3000',
      '/sidebar': 'http://localhost:3000',
      '/ws': 'http://localhost:3000'
    }
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/preset-react']
        }
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      }
    ]
  }
};
