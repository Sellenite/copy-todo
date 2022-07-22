const { defineConfig } = require('@vue/cli-service')
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');

module.exports = defineConfig({
  publicPath: './',
  assetsDir: "static",
  productionSourceMap: false,
  transpileDependencies: true,
  chainWebpack: config => {
    // 设置标题，默认不设置的话是项目名字
    config.plugin('html').tap(args => {
      args[0].title = 'Memo List'
      return args
    })
  },
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            require('postcss-pxtorem')({
              rootValue: 16, // 换算的基数
              selectorBlackList: ['.notrem-'], // 忽略转换正则匹配项
              propList: ['*'],
            }),
            require('autoprefixer')(),
          ]
        }
      },
    },
  },
})
