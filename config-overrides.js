// const {override, fixBabelImports, addLessLoader} = require("customize-cra");

// module.exports = override(
//     fixBabelImports("antd", {
//         libraryDirectory: "es",
//         style: true,
//     }),
//     addLessLoader({
//         javascriptEnable: true,
//     })
// )

module.exports = function override(webpackConfig) {
    webpackConfig.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto"
    });
  
    return webpackConfig;
  }