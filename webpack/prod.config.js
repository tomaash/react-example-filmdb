'use strict';

/* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
/* eslint camelcase: 0 */

require('babel/register');

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var writeStats = require('./utils/write-stats');

// clean `.tmp` && `dist`
require('./utils/clean-dist')();

module.exports = {
  devtool: 'source-map',
  entry: {
    app: [
      './app/index.js',
      'bootstrap-sass!./app/styles/bootstrap-sass.prod.config.js'
    ]
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[hash].js',
    publicPath: '/assets/'
  },
  module: {
    // preLoaders: [
    //   {
    //     test: /\.js$|.jsx$/,
    //     exclude: /node_modules|styles/,
    //     loaders: ['eslint', 'jscs']
    //   }
    // ],
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      },
      // {
      //   test: /\.(eot|ttf)$/,
      //   loader: 'url?limit=10000&name=[sha512:hash:base64:7].[ext]'
      // },
      // { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff'
      // },
      // {
      //   test: /\.(jpe?g|png|gif|svg)$/,
      //   loader: 'url?limit=10000&name=[sha512:hash:base64:7].[ext]!image?optimizationLevel=7&progressive&interlaced'
      // },
      {
        // |svg|woff|eot|ttf
        test: /\.(jpe?g|png|gif)$/,
        loader: 'url?limit=10000&name=[sha512:hash:base64:7].[ext]'
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff'
      },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader'
      },
      {
        test: /\.js$|.jsx$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?browsers=last 2 version!sass')
      },
      { test: /\.css$/,
          loader: 'style-loader!css-loader'
      }
    ]
  },
  plugins: [

    // extract css
    new ExtractTextPlugin('[name]-[hash].css'),

    // set env
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify('production')
      }
    }),

    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        sequences: true,
        dead_code: true,
        drop_debugger: true,
        comparisons: true,
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        hoist_funs: true,
        if_return: true,
        join_vars: true,
        cascade: true,
        drop_console: true
      },
      output: {
        comments: false
      }
    }),

    // write webpack stats
    function () { this.plugin('done', writeStats); }

  ],
  resolve: {
    extensions: ['', '.js', '.json', '.jsx'],
    modulesDirectories: ['node_modules', 'app']
  }
};
