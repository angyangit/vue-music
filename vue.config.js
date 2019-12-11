const path = require('path')
const resolve = dir => path.join(__dirname, dir)
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('components', resolve('src/components'))
      .set('assets', resolve('src/assets'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))
      .set('views', resolve('src/views'))
      .set('store', resolve('src/store'))
    config.output.chunkFilename(`js/[name].[chunkhash:8].js`)
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  devServer: {
    // historyApiFallback: {
    //   index: '/public/index.html'
    // },
    port: 8088, // 端口号
    https: false, // https:{type:Boolean}
    open: true, // 配置自动启动浏览器'http://172.16.1.12:7071/rest/mcdPhoneBar/'
    hotOnly: true, // 热更新
    // proxy: 'http://localhost:8000'   // 配置跨域处理,只有一个代理
    proxy: { // 配置自动启动浏览器
      '/api': {
        target: 'https://u.y.qq.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': '/'
        }
      },
      '/apc': {
        target: 'https://c.y.qq.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/apc': '/'
        },
        headers: {
          referer: 'https://c.y.qq.com/',
          host: 'c.y.qq.com'
        }
      }
    }
  }
}
