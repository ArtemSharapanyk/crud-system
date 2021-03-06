const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");


const devWebpackConfig = merge(baseWebpackConfig, {
  mode: "development",
  devServer: {
    contentBase: baseWebpackConfig.externals.paths.dist,
    port: 8081,
    overlay: {
      warnings: true,
      errors: true
    },
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:5000/api/'
    }
  },
  plugins: [

  ]
});

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig);
});
