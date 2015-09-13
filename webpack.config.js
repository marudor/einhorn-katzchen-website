var path = require('path');
var config = require('./baseWebpack.config');

config.eslint = {
  configFile: 'src/frontend/.eslintrc',
  failOnWarning: true,
  failOnError: true
};
config.entry = './src/frontend/main.js';
config.output = {
  path: path.resolve('lib'),
  filename: 'app.js',
  publicPath: ''
};

module.exports = config;
