var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './index.js'
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
      loaders: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0'
          },
          {
              test: /\.css$/,
              loader: "style-loader!css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]"
          },
          {
              test: /\.scss$/,
              loader: "style-loader!css-loader!sass-loader"
          },
          {
              test: /\.(jpg|png)$/,
              loader: "url-loader?limit=8192"
          },
          {
              test: /\.(eot|otf|ttf|woff|woff2|svg)\w*/,
              loader: 'file-loader'
          }
      ]
  }
};
