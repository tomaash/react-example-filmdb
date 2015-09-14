var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('./bootstrap-sass.config');

config.styleLoader = ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader?sourceMap');

module.exports = config;
