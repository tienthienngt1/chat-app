const {override, fixBabelImports, addLessLoader} = require("customize-cra");

module.exports = override(
    fixBabelImports("antd", {
        libraryDirectory: "es",
        style: true,
    }),
    addLessLoader({
        javascriptEnable: true,
    })
)