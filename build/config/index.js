/*
 * @Descripttion: webpack 内部定义的配置参数
 * @version:1.0
 * @Author: tiptop
 * @Date: 2020-07-15 23:12:02
 * @LastEditors: tiptop
 * @LastEditTime: 2020-08-15 22:59:00
 */

const path = require("path");

module.exports = {
  // 开发环境配置
  dev: {
    // Paths相关的配置
    assetsSubDirectory: "static", // 静态资源路径
    assetsPublicPath: "/", // 输出位置
    proxyTable: {
      // 配置代理服务
      "/api": {
        target: "http://www.soln.com/service/public/index.php", // 请求的第三方接口
        changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          // 路径重写
          "^/api": "", // 替换target中的请求地址，也就是说以后你在请求http://api.jisuapi.com/XXXXX这个地址的时候直接写成/api即可。
        },
      },
    },

    // dev-server 的配置
    host: "localhost", // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false, // 自动打开浏览器
    errorOverlay: true, // 运行错误的全屏警告
    notifyOnErrors: true,
    poll: false, // 轮询文件

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // 增加映射文件
    // source-map 增加映射文件，大全
    // eval-source-map 不会生成文件，但可以显示行和列，集成在生成的js内部
    // cheap-module-source-map不会产生列，但是是一个单独的映射文件,保留下来调试
    // cheap-module-eval-source-map 不会产生列，不会生成文件，集成在js内部
    devtool: "cheap-module-eval-source-map",

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true,
  },

  // 运行环境配置
  build: {
    // Template for index.html
    index: path.resolve(__dirname, "../../dist/index.html"),

    // Paths相关的配置
    assetsRoot: path.resolve(__dirname, "../../dist"), // 打包地址
    assetsSubDirectory: "static",
    assetsPublicPath: "./",

    /**
     * Source Maps
     */
    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: "source-map",

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
  },
};
