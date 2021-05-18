const webpack = require("webpack");
const merge = require("webpack-merge");
const {apiUrl} = require('../config');
const baseWebpackConfig = require("./webpack.base.conf");


const devWebpackConfig = merge(baseWebpackConfig, {
  mode: "development",
  devServer: {
    contentBase: baseWebpackConfig.externals.paths.dist,
    port: 3000,
    overlay: {
      warnings: true,
      errors: true
    },
    historyApiFallback: true,
    proxy: {
      '/api': `${apiUrl}`
    }
  },
  plugins: [

  ]
});

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig);
});
