module.exports = {
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10240 }))
  },
  devServer: {
    // 设置代理
    proxy: {
      '/api': {
        target: 'https://c.y.qq.com/', // 域名
        ws: true, // 是否启用websockets
        changeOrigin: true,
        headers: {
          referer: 'https://c.y.qq.com/',
          host: 'c.y.qq.com'
        },
        pathRewrite: {
          '^/api': ''
        }
      },
      '/uyqq': {
        target: 'https://u.y.qq.com/', // 域名
        ws: true, // 是否启用websockets
        changeOrigin: true,
        headers: {
          referer: 'https://y.qq.com/',
          host: 'y.qq.com'
        },
        pathRewrite: {
          '^/uyqq': ''
        }
      }
    }
  }
}
