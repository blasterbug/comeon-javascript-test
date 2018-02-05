'use strict';

const path = require( 'path' );
const webpack = require( 'webpack' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

// http://webpack.github.io/docs/configuration.html
// http://webpack.github.io/docs/webpack-dev-server.html
module.exports = {
  output: {
    path: path.resolve( __dirname, 'dist' ),
    filename: '[name].[hash].js',
    sourceMapFilename: '[name].[hash].map',
    chunkFilename: '[id].[hash].js'
  },
  module: {
    rules: [
      {
        // https://github.com/jtangelder/sass-loader
        test: /\.scss$/,
        // use: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   //resolve-url-loader may be chained before sass-loader if necessary
        //   use: ['css-loader', 'sass-loader']
        // })
        loader: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        loader: [
          'style-loader',
          'css-loader'
        ]
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(
      'dist/',
      {
      root:  path.resolve( __dirname ),
      verbose: true,
      dry: false, // true for simulation
      }
    ),
    new CopyWebpackPlugin(
      [
        {
          from: path.resolve( __dirname, 'images/' ),
          to: path.resolve( __dirname, 'dist/images' )
        },
        {
          from: path.resolve( __dirname, 'lib/' ),
          to: path.resolve( __dirname, 'dist/lib' )
        },
        {
          from: path.resolve( __dirname, 'mock/' ),
          to: path.resolve( __dirname, 'dist/mock' )
        },
        {
          from: path.resolve( __dirname, 'stylesheets/' ),
          to: path.resolve( __dirname, 'dist/stylesheets' )
        }
      ],
      {
        ignore: [
          '*.html',
          '.*'
        ]
      }
    ),
    new HtmlWebpackPlugin({
      cache: true,
      title: 'ComeOn Javascript Test',
      template: path.resolve( __dirname, 'src/index.html' ),
      favicon:  path.resolve( __dirname, 'images/favicon.ico' )
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ]
};
