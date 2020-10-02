const path = require('path')

module.exports = {
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
    overlay: {
      warnings: true,
      errors: true
    }
  }
}
