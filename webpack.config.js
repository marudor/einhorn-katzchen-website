var path = require('path');
var webpack = require('webpack');

module.exports = {
  eslint: {
    configFile: 'src/frontend/.eslintrc',
    failOnWarning: true,
    failOnError: true
  },
  context: __dirname,
  entry: [
    './src/frontend/main.js'
  ],
  output: {
    path: path.resolve('lib'),
    filename: 'app.js',
    publicPath: ''
  },
  resolve: {
    alias: {
      eventemitter: 'eventemitter3'
    }
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel!eslint', include: path.join(__dirname, 'src')},
      { test: /\.(jpg|png|gif)$/, loader: 'file!image' },
      { test: /\.woff2?(\?v=.*)?$/, loader: 'url?limit=10000&minetype=application/font-woff' },
      { test: /\.(eot|ttf|svg|otf)(\?v=.*)?$/, loader: 'url' },
      { test: /\.json$/, loader: 'json' }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};
