const { name } = require('./package.json')
const path = require('path')
const isProduction = process.env.NODE_ENV !== 'development' // 是否为生产环境

// const { OSS_REGION, OSS_ACCESSKEYID, OSS_ACCESSKEYSECRET, OSS_BUCKET } = process.env
const assetsCDN = {
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex'
  },
  css: [
  ],
  js: [
    'https://cdn.bootcss.com/vue/2.6.11/vue.min.js',
    'https://cdn.bootcss.com/vue-router/3.1.5/vue-router.min.js',
    'https://cdn.bootcss.com/vuex/3.1.2/vuex.min.js',
    'https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js',
    'https://cdn.bootcss.com/moment.js/2.24.0/locale/zh-cn.js'
  ]
}

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, 'src/assets/styles/variables.less')
      ]
    })
}

module.exports = {
  lintOnSave: false,
  devServer: {
    port: 1002,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    },
    externals: (isProduction) ? assetsCDN.externals : {},
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          // If you are using less-loader@5 please spread the lessOptions to options directly
          modifyVars: {
            'primary-color': '#007BFC',
            'link-color': '#007BFC',
            'table-padding-vertical': '10px', // 表格上下padding
            'table-padding-horizontal': '10px', // 表格左右padding
            'font-size-base': '12px', // 基准字体大小
            'card-padding-base': '10px', // Card body padding
            'card-head-padding': '5px', // Card head padding
            'modal-body-padding': '20px 24px',
            'text-color': 'rgba(0,0,0,.85)', // 标准字
            'border-radius-base': '2px', // 圆角
            /** 按钮 */
            'btn-height-base': '30px', // 按钮高度
            'btn-font-weight': '400',
            'btn-border-radius-base': '2px', // 按钮圆角
            'btn-border-radius-sm': '2px', // 按钮圆角
            'btn-shadow': 'none', // 阴影
            'btn-primary-shadow': 'none', // 阴影
            'btn-text-shadow': 'none', // 文字阴影
            // 'btn-disable-color': '#f5f5f5', // 禁用
            /** input */
            'input-height-base': '30px',
            'input-padding-horizontal': '10px',
            'input-padding-horizontal-base': '10px',
            'input-placeholder-color': 'rgba(0,0,0,.45)',
            'input-border-color': '#D9D9D9',
            'input-disabled-bg': '#f5f5f5'
          },
          javascriptEnabled: true
        }
      }
    }
  },
  chainWebpack: config => {
    // 全局引入index.less 样式
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
    // 添加cdn
    config.plugin('html').tap(args => {
      if (isProduction) args[0].cdn = assetsCDN
      return args
    })
    /* 添加分析工具 */
    if (process.env.NODE_ENV === 'production') {
      if (process.env.npm_config_report) {
        config.plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
          .end()
        config.plugins.delete('prefetch')
      }
    }
  }
}
