'use strict';

const path = require( 'path' );
const webpack = require( 'webpack' );
const merge = require( 'webpack-merge' );
const config = require( './webpack.config.js' );
const CompressionPlugin = require( 'compression-webpack-plugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

const extractSass = new ExtractTextPlugin({
    filename: '[name].[contenthash].css',
    disable: process.env.NODE_ENV === 'development'
});

module.exports = merge( config, {
  entry: {
    vendor: [
      'prop-types',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
    ],
    app: [
      'babel-polyfill',
       path.resolve( __dirname, 'src/index.js' )
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'airbnb',
            ],
            plugins: [
              'transform-runtime',
              'syntax-dynamic-import'
            ]
          }
        }
      }
    ]
  },
  // devtool: 'cheap-module-source-map',
  devtool: 'inline-source-map',
  devServer: {
    contentBase:  path.resolve( __dirname, 'dist' ),
    clientLogLevel: 'info',
    historyApiFallback: true,
    hot: true
  },
  plugins: [
    extractSass,
    new webpack.DefinePlugin({
      // https://github.com/facebook/react/issues/7032
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'md5',
      hashDigest: 'hex',
      hashDigestLength: 20
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$/,
      threshold: 10240,
      minRatio: 0
    })
  ]
});
