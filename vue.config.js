const path = require('path')

module.exports = {
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') return

    config
      .entry('main')
      .clear()

    config
      .entry('main')
      .add(path.join(__dirname, './examples/src/index.js'))
  },

  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, './src')
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/styles/_variables.scss";
        `
      }
    }
  },
  devServer: {
    open: true,
    openPage: '?invoice_id=7',
    overlay: {
      warnings: true,
      errors: true
    }
  }
}
