var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var webpackConfig = {
  entry: {
    index: './src/index.js'
  },

  output: {
    path: './dist/',
    filename: 'js/[name].js'
  },

  resolve: {
    extensions: ['', '.js', '.vue']
  },

  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue'
    }, {
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }]
  },
  vue: {
    loaders: {
      js: 'babel'
    }
  },

  devtool: 'eval-source-map',
  devServer: {
    quiet: false,
    noInfo: false,
    publicPath: '/dev/',
    stats: {
      colors: true
    }
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
};

module.exports = webpackConfig;
