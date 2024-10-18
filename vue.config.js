const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer:{
    port: 8000,
    proxy: {
      '/api': {
        target: 'https://xkcd.com',
        ws: true,
        pathRewrite: { '/api': '' }
      }
  },
}})
