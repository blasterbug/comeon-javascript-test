'use strict';

const path = require( 'path' );
const webpack = require( 'webpack' );
const merge = require( 'webpack-merge' );
const config = require( './webpack.config.js' );
const CompressionPlugin = require( 'compression-webpack-plugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const FaviconsWebpackPlugin = require( 'favicons-webpack-plugin' );

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
    compress: true,
    clientLogLevel: 'error',
    historyApiFallback: true,
    contentBase: path.resolve( __dirname, 'public' ),
    //https://webpack.js.org/configuration/dev-server/#devserver-disablehostcheck
    //disableHostCheck: true,
    proxy: [{ // should be useless in prodmode
      context: '/api',
      target: {
        host: process.env.LOOGUP_API_HOST || 'localhost',
        port: process.env.LOOGUP_API_PORT ||  7000
      },
      pathRewrite: { '^/api/' : '/' }
    }]
  },
  plugins: [
    extractSass,
    new webpack.DefinePlugin({
      // https://github.com/facebook/react/issues/7032
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve( __dirname, 'public/favicon.jpg') ,
      prefix: 'icons/',
      inject: true,
      background: '#fc1683',
      title: 'loogup',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: true,
        yandex: false,
        windows: false
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      uglifyOptions: {
        comparisons: true,
        conditionals: true,
        dead_code: true,
        evaluate: true,
        ie8: false,
        if_return: true,
        join_vars: true,
        sequences: true,
        unused: true,
        warnings: false
      },
      output: {
        comments: false,
        beautify: false
      },
      exclude: [ /\.min\.js$/gi ] // skip pre-minified libs
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'md5',
      hashDigest: 'hex',
      hashDigestLength: 20
    }),
    //new webpack.IgnorePlugin( /^\.\/locale$/, [ /moment$/, /react-intl$/ ] ),
    new webpack.NoEmitOnErrorsPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    })
  ]
});
