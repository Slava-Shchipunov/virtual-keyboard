const path = require('path');

module.exports = {
  entry: './virtual_keyboard/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
