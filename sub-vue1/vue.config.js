const { name } = require('./package.json')

module.exports = {
  lintOnSave: false,
  devServer: {
    port: 1001,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    },
  }
}
