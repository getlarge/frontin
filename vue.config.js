const webpack = require("webpack");

process.env.VUE_APP_VERSION = require("./package.json").version;

module.exports = {
  lintOnSave: false,
  baseUrl: undefined,
  outputDir: "build",
  assetsDir: undefined,
  runtimeCompiler: true,
  productionSourceMap: false,
  parallel: undefined,
  css: undefined,
  // devServer: {
  //   proxy: {
  //     "^/api": {
  //       target: "https://node.getlarge.eu",
  //       ws: true,
  //       changeOrigin: true
  //     }
  //   }
  // }
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        "window.Quill": "quill/dist/quill.js",
        Quill: "quill/dist/quill.js"
      })
    ]
  },
  publicPath: undefined
};
