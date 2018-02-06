'use strict';

const path = require( 'path' );
const merge = require( 'webpack-merge' );
const config = require( './webpack.config.js' );
const webpack = require( 'webpack' );

// inherit from the main config file
module.exports = merge( config, {
  entry: [
    // http://gaearon.github.io/react-hot-loader/getstarted/
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    path.resolve( __dirname, 'src/index.js' )
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'react-hot-loader/webpack',
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'airbnb'
              ],
              plugins: [
                'transform-runtime',
                'syntax-dynamic-import'
              ]
            }
          }
        ],
      }
    ],
  },
  watch: true,
  devtool: 'eval',
  devServer: {
    contentBase:  path.resolve( __dirname, 'dist' ),
    clientLogLevel: 'info',
    historyApiFallback: true,
    hot: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});
